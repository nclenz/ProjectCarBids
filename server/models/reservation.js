const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    listing: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
  },
  { timestamps: true }
);

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
