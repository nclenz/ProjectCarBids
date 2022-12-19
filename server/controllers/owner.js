const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const owner = express.Router();
const Owner = require("../models/owner.js");

/**
 * Validation for host sign-up
 * name - check if string contains only letters, ignore white-spaces
 * email - check if string is a valid email address
 * password - check if string is alphanumeric and at least 8 alphanumeric characters
 * mobile - check if the string starts with +65 to be a valid SG number
 * creditCard - check if string is a valid credit card numbere
 * username - check if username is already in use
 * email - check if the email is already in use
 */
owner.post(
  "/signup",
  body("name").isAlpha(["en-US"], { ignore: " _-" }),
  body("email").isEmail(),
  body("password").isAlphanumeric().isLength({ min: 8 }),
  body("mobile").isMobilePhone(["en-SG", true]),
  body("username").custom(async (value) => {
    return await Owner.find({ username: value }).then((user) => {
      if (user.length) {
        return Promise.reject("Username already in use");
      }
    });
  }),
  body("email").custom(async (value) => {
    return await Owner.find({ email: value }).then((user) => {
      if (user.length) {
        return Promise.reject("Email already in use");
      }
    });
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = req.body;
      data.password = bcrypt.hashSync(data.password, 10);
      const newHost = await Owner.create(data);
      res.status(200).send(newHost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

function isAuthenticatedHost(req, res, next) {
  if (req.session.role === "host") {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}
owner.get("/seed", async (req, res) => {
  const owner = {
    username: "admin",
    password: bcrypt.hashSync("12345678", 10),
    name: "Jaya Lala",
    email: "jajaja@hotmail.com",
    mobile: 96782222,
  };
  try {
    await Owner.deleteMany({});
    const newOwner = await Owner.create(owner);
    res.json(newOwner);
  } catch (error) {
    res.status(500).json(error);
  }
});

owner.get("/accounts", [isAuthenticatedHost], async (req, res) => {
  try {
    const foundOwners = await Owner.find().exec();
    res.status(200).json(foundOwners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

owner.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Owner.findById(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = owner;
