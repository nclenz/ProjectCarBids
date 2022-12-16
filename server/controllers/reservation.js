const express = require("express");
const { restart } = require("nodemon");
const reservation = express.Router();
const Reservation = require("../models/reservation");
const renter = require("./renter");

reservation.get("/seed", async (req, res) => {
  const reservation = {
    username: "admin",
    dates: "09-12-2022",
  };
  try {
    await Reservation.deleteMany({});
    const newReservation = await Reservation.create(reservation);
    res.json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function isAuthenticatedUser(req, res, next) {
  if (req.session.role) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

reservation.post("/reserve", [isAuthenticatedUser], async (req, res) => {
  try {
    const createdReservation = await Reservation.create(req.body);
    res.status(200).send(createdReservation);
  } catch (error) {
    res(400).json({ error: error.message });
  }
});

reservation.get("/retrieve/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
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
