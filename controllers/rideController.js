const Ride = require("../models/rideModel");

// POST /api/rides
const createRide = async (req, res) => {
  try {
    console.log("📥 Data Received:", req.body); // 👈 ADD THIS LINE

    const { pickup, drop } = req.body;
    if (!pickup || !drop) {
      return res.status(400).json({ message: "Pickup & drop required" });
    }

    const newRide = await Ride.create({ pickup, drop });
    res.status(201).json(newRide);
  } catch (err) {
    console.error("❌ Error in createRide:", err.message); // 👈 ALSO ADD THIS
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all rides (with filtering based on status)
exports.getRides = async (req, res) => {
  try {
    const { status } = req.query;  // Fetch the status from the query parameters
    let rides;
    if (status) {
      rides = await Ride.find({ status }); // If a status is provided, filter by status
    } else {
      rides = await Ride.find(); // Otherwise, fetch all rides
    }
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rides", error });
  }
};

exports.updateRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { pickup, drop, status } = req.body;
    const updatedRide = await Ride.findByIdAndUpdate(
      id,
      { pickup, drop, status },
      { new: true }
    );
    res.status(200).json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: "Error updating ride", error });
  }
};


// GET /api/rides
const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rides", error: err.message });
  }
};

module.exports = { createRide, getAllRides };
