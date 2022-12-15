const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    dates: [{ type: Date, required: true }],
    listing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listings" }],
  },
  { timestamps: true }
);

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
