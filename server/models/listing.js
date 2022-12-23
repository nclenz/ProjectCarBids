const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      enum: [
        "Audi",
        "BMW",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Dodge",
        "Ford",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaguar",
        "Jeep",
        "Kia",
        "Land Rover",
        "Lexus",
        "Mazda",
        "Mercedes-Benz",
        "Mini",
        "Mitsubishi",
        "Nissan",
        "Porsche",
        "Ram",
        "Subaru",
        "Toyota",
        "Volkswagen (VW)",
        "Volvo",
        "Others",
      ],
    },
    model: { type: String, required: true },
    type: {
      type: String,
      enum: ["Sedan", "Hatchback", "Sports", "SUV", "MPV"],
    },
    price: { type: Number, required: true },
    transmission: { type: String, required: true, enum: ["Manual", "Auto"] },
    fuel: { type: String, required: true, enum: ["Petrol", "Diesel"] },
    availability: { type: Boolean, required: true, default: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "reservation" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner" },
  },
  { timestamps: true }
);

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
