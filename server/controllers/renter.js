const express = require("express");
const renter = express.Router();
const Renter = require("../models/renter.js");

renter.post("/signup", async (req, res) => {
  try {
    const newRenter = await Renter.create(req.body);
    res.status(200).send(newRenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

renter.get("/seed", async (req, res) => {
  const renter = {
    username: "admin",
    password: "12345678",
    name: "Jun Jie",
    email: "jj@hotmail.com",
    creditcard: 4256293384759102,
    cvc: 321,
  };
  try {
    //await Renter.deleteMany({});
    const newRenter = await Renter.create(renter);
    res.json(newRenter);
  } catch (error) {
    res.status(500).json(error);
  }
});

renter.get("/accounts", async (req, res) => {
  try {
    const foundRenters = await Renter.find().exec();
    res.status(200).json(foundRenters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = renter;
