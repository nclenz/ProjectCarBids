require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT ?? 7000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);
app.use(express.json());
app.use(express.static("../client/dist"));

app.get("/api/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client/dist", "index.html"));
})

mongoose.connection.once("open", () => {
    console.log("connect to mongodb")
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
})
