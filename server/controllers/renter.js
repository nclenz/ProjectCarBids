const express = require("express");
const bcrypt = require("bcrypt");
const renter = express.Router();
const Renter = require("../models/renter.js");

renter.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    const newRenter = await Renter.create(data);
    res.status(200).send(newRenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

renter.get("/seed", async (req, res) => {
  const renter = {
    username: "admin",
    password: bcrypt.hashSync("12345678", 10),
    name: "Jun Jie",
    email: "jj@hotmail.com",
    creditcard: 4256293384759102,
    cvc: 321,
  };
  try {
    await Renter.deleteMany({});
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

renter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Renter.findById(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = renter;
