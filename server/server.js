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
const owner = require("../server/controllers/owner.js");
const Owner = require("./models/owner.js");
const Renter = require("./models/renter.js");

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
app.use("/api/host", ownerController);
app.use("/api/rent", renterController);

// sessions
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// middleware to test if user is authenticated host
function isAuthenticatedHost(req, res, next) {
  if (req.session.user && req.session.role === "host") {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

// middleware to test if user is authenticated user
function isAuthenticatedRenter(req, res, next) {
  if (req.session.user && req.session.role == "renter") {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
}

// host login
app.post("/hostlogin", async (req, res) => {
  const { username, password } = req.body;
  const user = await Owner.findOne({ username }).exec();

  if (user === null) {
    return res.status(401).json({ msg: "User not found" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  req.session.userid = username;
  req.session.role = "host";
  return res.json({ msg: "user logged in" });
});

// user logout
app.post("/renterlogin", async (req, res) => {
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
  return res.json({ msg: "user logged in" });
});

// logout
app.delete("/logout", (req, res) => {
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
