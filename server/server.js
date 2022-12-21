const result = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = mongoose.connection;
const ownerController = require("../server/controllers/owner.js");
const renterController = require("../server/controllers/renter.js");
const reservationController = require("../server/controllers/reservation.js");
const listingController = require("../server/controllers/listing.js");
const owner = require("../server/controllers/owner.js");
const Owner = require("./models/owner.js");
const Renter = require("./models/renter.js");
const reservation = require("./controllers/reservation.js");

const app = express();
const PORT = process.env.PORT ?? 7000;
const MONGO_URI = process.env.MONGO_URI;

// mongoose settings
mongoose.connect(MONGO_URI);
mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
mongoose.set("debug", true);
mongoose.connect(MONGO_URI);

// check dot env
if (result.error) {
  console.log(result.error);
}

// check mongodb connection status
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGO_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use(cookieParser());

// sessions
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// routes
app.use("/api/host", ownerController);
app.use("/api/rent", renterController);
app.use("/api/reservation", reservationController);
app.use("/api/listing", listingController);

// host login
app.post("/api/hostlogin", async (req, res) => {
  const { username, password } = req.body;
  const user = await Owner.findOne({ username }).exec();

  if (user === null) {
    return res.status(401).json({ msg: "User not found" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  req.session.role = "host";
  return res.json(user._id);
});

// user login
app.post("/api/renterlogin", async (req, res) => {
  const { username, password } = req.body;
  const user = await Renter.findOne({ username }).exec();

  if (user === null) {
    return res.status(401).json({ msg: "User not found" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  req.session.userid = username;
  req.session.role = "renter";
  return res.json(user._id);
});

// logout
app.delete("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Sucessfully logged out" });
  });
});

app.get("/api/", (req, res) => {
  res.json({ message: "connection success!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist", "index.html"));
});

mongoose.connection.once("open", () => {
  console.log("connect to mongodb");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
