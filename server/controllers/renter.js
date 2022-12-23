const express = require("express");
const bcrypt = require("bcrypt");
const { param, body, validationResult } = require("express-validator");
const renter = express.Router();
const Renter = require("../models/renter.js");

renter.get("/seed", async (req, res) => {
  const uniqueId = "639af3156fe6cd45ac77f674";
  const renter = {
    username: "admin",
    password: bcrypt.hashSync("12345678", 10),
    name: "Jun Jie",
    email: "jj@hotmail.com",
    mobile: 96782222,
    creditCard: bcrypt.hashSync("4256293384759102", 10),
    cvc: bcrypt.hashSync("321", 10),
    reservation: [uniqueId],
  };
  try {
    await Renter.deleteMany({});
    const newRenter = await Renter.create(renter);
    res.json(newRenter);
  } catch (error) {
    res.status(500).json(error);
  }
});

// middleware to test if user is authenticated user
function isAuthenticatedRenter(req, res, next) {
  if (req.session.role == "renter") {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

/**
 * Validation for renter sign-up
 * name - check if string contains only letters, ignore white-spaces
 * email - check if string is a valid email address
 * password - check if string is alphanumeric and at least 8 alphanumeric characters
 * mobile - check if the string starts with +65 to be a valid SG number
 * creditCard - check if string is a valid credit card numbere
 * username - check if username is already in use
 * email - check if the email is already in use
 */
renter.post(
  "/signup",
  body("name").isAlpha(["en-US"], { ignore: " _-" }),
  body("email").isEmail(),
  body("password").isAlphanumeric().isLength({ min: 8 }),
  body("mobile").isMobilePhone(["en-SG", true]),
  body("creditCard").isCreditCard(),
  body("cvc").isNumeric().isLength({ min: 3, max: 3 }),
  body("username").custom(async (value) => {
    return await Renter.find({ username: value }).then((user) => {
      if (user.length) {
        return Promise.reject("Username already in use");
      }
    });
  }),
  body("email").custom(async (value) => {
    return await Renter.find({ email: value }).then((user) => {
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
      data.creditCard = bcrypt.hashSync(data.creditCard, 10);
      data.cvc = bcrypt.hashSync(data.cvc, 10);
      const newRenter = await Renter.create(data);
      res.status(200).send(newRenter);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

renter.get("/accounts", [isAuthenticatedRenter], async (req, res) => {
  try {
    const foundRenters = await Renter.find().populate("reservation").exec();
    res.status(200).json(foundRenters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

renter.get(
  "/:id",
  [isAuthenticatedRenter],
  param("id").isMongoId(),
  async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Renter.findById(id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = renter;
