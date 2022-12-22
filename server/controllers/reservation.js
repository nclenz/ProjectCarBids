const express = require("express");
const { restart } = require("nodemon");
const reservation = express.Router();
const Reservation = require("../models/reservation");
const Listing = require("../models/listing");
const Owner = require("../models/owner");

const renter = require("./renter");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

reservation.get("/seed", async (req, res) => {
  const reservation = {
    username: "admin",
    startdate: "09-12-2022",
    enddate: "11-12-2022",
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
    const listing = await Listing.findById(req.body.listing);
    const owner = await Owner.findById(listing.owner);
    const number = `+65${owner.mobile}`;
    const message = `Dear ${owner.name}, \n There is a upcoming reservation for your vehicle 
    from ${req.body.startdate} to ${req.body.enddate}. Please ensure that your vehicle is 
    available for pick-up during this period.\n Thank you choosing CarRental! `;

    // const createdReservation = await Reservation.create(req.body);
    const createdReservation = await Reservation.create(req.body);
    console.log(req.body)
    // sendSmsNotification(message, number);

    res.status(200).send(createdReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservation.get("/retrieve/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.find({username: id});
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservation.get("/reserve/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.find({username: id});
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservation.delete("/remove/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByIdAndRemove(id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservation.get("/all", [isAuthenticatedUser], async (req, res) => {
  try {
    const foundReservation = await Reservation.find().exec();
    res.status(200).json(foundReservation);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

module.exports = reservation;
