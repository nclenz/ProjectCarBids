const express = require("express");
const bcrypt = require("bcrypt");
const listing = express.Router();
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const aws = require("aws-sdk");
const Listing = require("../models/listing.js");
const Reservation = require("../models/reservation.js");
require("dotenv").config();

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
    owner: uniqueOwnerId,
  };
  try {
    await Listing.deleteMany({});
    const newListing = await Listing.create(listing);
    res.json(newListing);
  } catch (error) {
    res.status(500).json(error);
  }
});

// temporary store uploaded file in buffer
const storage = multer.memoryStorage();

// check file type uploaded, must be JPEG
const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// configuration for upload variables
const upload = multer({ storage: storage, fileFilter: filefilter });

// create S3 instance
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_S3_BUCKET_REGION,
});

listing.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
    Key: Date.now() + req.file.originalname, // Name of the image
    Body: req.file.buffer, // Body which will contain the image in buffer format
    ACL: "public-read-write", // defining the permissions to get the public link
    ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
  };

  // uploading photo and save link in database
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({ err: error + "This is "   }); // if we get any error while uploading error message will be returned.
    }
    console.log(data);
  });

  return res.status(200).send({ msg: "uploaded successfully" });
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
  [isAuthenticatedUser],
  upload.single("image"),
  body("brand").isAlpha(["en-US"], { ignore: " _-" }),
  body("type").isAlpha(),
  body("price").isCurrency(),
  body("transmission").isAlpha(),
  body("fuel").isAlpha(),
  body("availability").isBoolean(),
  body("location").isAlpha(),
  async (req, res) => {
    const newListing = req.body;

    // return validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.file);

    // parameters for s3 instance
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
      Key: Date.now() + req.file.originalname, // timestamp + filename
      Body: req.file.buffer, // image
      ACL: "public-read-write", // permissions
      ContentType: "image/jpeg", // define content-type
    };

    // uploading photo and save link in database
    s3.upload(params, async (error, data) => {
      if (error) {
        res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
      } else {
        newListing.image = data.Location;
        console.log("File uploaded to:" + data.Location);
        try {
          const createdListing = await Listing.create(newListing);
          res.status(200).send(createdListing);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }
    });
  }
);

// return the latest listings, up to 10 of them
listing.get("/latest/:num", async (req, res) => {
  const { num } = req.params;

  if (num > 10) {
    res.status(400).json({ error: "Limited to 10 latest listings only" });
  }

  try {
    const listings = await Listing.find().sort({ _id: -1 }).limit(num);
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// return a listing based on the provided listing ID
listing.get("/retrieve/:id", [isAuthenticatedUser], async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// remove a listing based on the provided listing ID
listing.delete("/remove/:id", body("id").isMongoId(), async (req, res) => {
  const { id } = req.params;
  const ObjectId = require("mongoose").Types.ObjectId;
  // search reservations with listing ID, if dates overlap, deletion is not allowed
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const foundReservation = await Reservation.find({
    $or: [{ startdate: { $gte: today } }, { enddate: { $gte: today } }],
    listing: new ObjectId(id),
  });

  if (foundReservation.length) {
    return res.status(400).json({
      error:
        "Booking exists, unable to delete listing. Change availability to false instead",
    });
  }

  try {
    const listing = await Listing.findByIdAndRemove(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a listing based on the provided listing ID
listing.put("/edit/:id", body("id").isMongoId(), async (req, res) => {
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

// retrieve all of the listings
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
