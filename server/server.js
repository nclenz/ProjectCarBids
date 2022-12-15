require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = mongoose.connection;
const ownerController = require("../server/controllers/owner.js");
const renterController = require("../server/controllers/renter.js");

const app = express();
const PORT = process.env.PORT ?? 7000;
const MONGO_URI = process.env.MONGO_URI;

// mongoose settings
mongoose.connect(MONGO_URI);
mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
mongoose.set("debug", true);
mongoose.connect(MONGO_URI);

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

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

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
