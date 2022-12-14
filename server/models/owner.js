const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minLength: 5 },
  password: { type: String, required: true, minLength: 8 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true, minLength: 8, maxLength: 8 },
  listing: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
});

const Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;
