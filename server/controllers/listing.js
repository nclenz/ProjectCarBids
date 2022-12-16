const express = require("express");
const bcrypt = require("bcrypt");
const listing = express.Router();
const Listing = require("../models/listing.js");

listing.get("/seed", async (req, res) => {
  const uniqueReservationId = "639af3156fe6cd45ac77f674";
  const uniqueOwnerId = "639ad556232ea4bba24aa0e1";
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

listing.post("/create", [isAuthenticatedUser], async (req, res) => {
  try {
    const createdListing = await Listing.create(req.body);
    res.status(200).send(createdListing);
  } catch (error) {
    res(400).json({ error: error.message });
  }
});

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
