const express = require("express");
const { restart } = require("nodemon");
const reservation = express.Router();
const Reservation = require("../models/reservation");
const Listing = require("../models/listing");
const Owner = require("../models/owner");
const { body, validationResult } = require("express-validator");

const renter = require("./renter");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

reservation.get("/seed", async (req, res) => {
  const reservation = {
    username: "639fd312c1fd02d67e6a086a",
    startdate: "2022-12-09",
    enddate: "2022-12-11",
    listing: "639fd38cdbe05c8b64dd05dd",
  };
  try {
    await Reservation.deleteMany({});
    const newReservation = await Reservation.create(reservation);
    res.json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function sendSmsNotification(message, customerPhoneNumber) {
  const client = twilio(accountSid, authToken);
  const options = {
    to: customerPhoneNumber,
    from: twilioNumber,
    body: message,
  };

  return client.messages.create(options).then((message) => {
    console.log(message.sid);
  });
}

function isAuthenticatedUser(req, res, next) {
  if (req.session.role) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

reservation.post("/reserve", async (req, res) => {
  try {
    const reserveStartDate = req.body.startdate;
    const reserveEnddate = req.body.enddate;
    const renterID = req.body.username;
    const reserve = req.body.listing;

    // console.log(new Date(reserveStartDate).toISOString());
    // console.log(new Date(Date.parse(reserveStartDate)));
    const ObjectId = require("mongoose").Types.ObjectId;

    // check if reservation for the listings overlaps
    const listingRecords = await Reservation.find({
      startdate: { $lte: reserveEnddate },
      enddate: { $gte: reserveStartDate },
      listing: new ObjectId(reserve),
    });
    // check if user has multiple reservations on the same date
    const reservationRecords = await Reservation.find({
      username: renterID,
      startdate: { $lte: reserveEnddate },
      enddate: { $gte: reserveStartDate },
    });

    if (listingRecords.length) {
      return res
        .status(400)
        .json({ error: "Unable to book for the dates specified." });
    }

    if (reservationRecords.length) {
      return res.status(400).json({
        error: "There is an existing reservation for the specified dates.",
      });
    }

    const listing = await Listing.findById(req.body.listing);
    const owner = await Owner.findById(listing.owner);
    const number = `+65${owner.mobile}`;
    const message = `Dear ${owner.name}, There is a upcoming reservation for your vehicle from ${req.body.startdate} to ${req.body.enddate}. Please ensure that your vehicle is available for pick-up during this period. Thank you choosing CarRental! `;

    const createdReservation = await Reservation.create(req.body);
    console.log(req.body);
    sendSmsNotification(message, number);

    res.status(200).send(createdReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservation.get(
  "/retrieve/:id",
  [isAuthenticatedUser],
  // body("id").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      const reservation = await Reservation.find({ username: id })
        .populate("listing")
        .exec();
      // const reservation = await Reservation.findById(id);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

reservation.delete(
  "/remove/:id",
  [isAuthenticatedUser],
  body("id").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      const reservation = await Reservation.findByIdAndRemove(id);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

reservation.get("/all", [isAuthenticatedUser], async (req, res) => {
  try {
    const foundReservation = await Reservation.find().exec();
    res.status(200).json(foundReservation);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

module.exports = reservation;
