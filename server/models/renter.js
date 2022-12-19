const mongoose = require("mongoose");

const renterSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minLength: 5 },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true, minLength: 8, maxLength: 8 },
  creditCard: { type: String, required: true },
  cvc: { type: String, required: true },
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "reservation" }],
});

const Renter = mongoose.model("renter", renterSchema);

module.exports = Renter;
