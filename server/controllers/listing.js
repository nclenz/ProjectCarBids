const express = require("express");
const bcrypt = require("bcrypt");
const listing = express.Router();
const { body, validationResult } = require("express-validator");

const Listing = require("../models/listing.js");

listing.get("/seed", async (req, res) => {
  const uniqueReservationId = "639fd3590572c460f6b2aed6";
  const uniqueOwnerId = "63a001270482abfc49f49935";
  const listing = {
    brand: "Mercedes Benz",
    model: "GLA180",
    type: "Sedan",
    price: 100,
    transmission: "Auto",
    fuel: "Petrol",
    availability: true,
    image:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/benz-gla-my21-index-1.png",
    location: "Yishun",
    reservation: [uniqueReservationId],
    owner: [uniqueOwnerId],
  };
  try {
    await Listing.deleteMany({});
    const newListing = await Listing.create(listing);
    res.json(newListing);
  } catch (error) {
    res.status(500).json(error);
  }
});

function isAuthenticatedUser(req, res, next) {
  if (req.session.role) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

listing.post(
  "/create",
  body("brand").isAlpha(["en-US"], { ignore: " _-" }),
  body("type").isAlpha(),
  body("price").isCurrency(),
  body("transmission").isAlpha(),
  body("fuel").isAlpha(),
  body("availability").isBoolean(),
  body("image").isURL(),
  body("location").isAlpha(),
  [isAuthenticatedUser],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const createdListing = await Listing.create(req.body);
      res.status(200).send(createdListing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

listing.get("/retrieve/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

listing.delete("/remove/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findByIdAndRemove(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

listing.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const data = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(updatedListing);
  } else {
    return res.status(400).json({ error: "unable to update" });
  }
});

listing.get("/all", [isAuthenticatedUser], async (req, res) => {
  try {
    const foundListings = await Listing.find()
      .populate("reservation")
      .populate("owner")
      .exec();
    res.status(200).json(foundListings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = listing;
