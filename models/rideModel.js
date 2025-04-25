const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  pickup: {
    type: String,
    required: true,
  },
  drop: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending", // 👈 New field
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ride", rideSchema);
