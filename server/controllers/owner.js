const express = require("express");
const owner = express.Router();
const Owner = require("../models/owner.js");

owner.post("/signup", async (req, res) => {
  try {
    const newHost = await Owner.create(req.body);
    res.status(200).send(newHost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

owner.get("/seed", async (req, res) => {
  const owner = {
    username: "jayalalala",
    password: "12345678",
    name: "Jaya Lala",
    email: "jajaja@hotmail.com",
  };
  try {
    //await Owner.deleteMany({});
    const newOwner = await Owner.create(owner);
    res.json(newOwner);
  } catch (error) {
    res.status(500).json(error);
  }
});

owner.get("/accounts", async (req, res) => {
  try {
    const foundOwners = await Owner.find().exec();
    res.status(200).json(foundOwners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = owner;
