const mongoose = require("mongoose");

const renterSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minLength: 5 },
  password: { type: String, required: true, minLength: 8 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  creditcard: { type: Number, required: true, minLength: 16, maxLength: 16 },
  cvc: { type: Number, required: true, minLength: 3, maxLength: 3 },
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listings" }],
});

const Renter = mongoose.model("renter", renterSchema);

module.exports = Renter;
