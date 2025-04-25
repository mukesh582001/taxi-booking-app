const Ride = require("../models/rideModel");

// POST /api/rides
const createRide = async (req, res) => {
  try {
    console.log("📥 Data Received:", req.body);

    const { pickup, drop } = req.body;
    if (!pickup || !drop) {
      return res.status(400).json({ message: "Pickup & drop required" });
    }

    const newRide = await Ride.create({ pickup, drop });
    res.status(201).json(newRide);
  } catch (err) {
    console.error("❌ Error in createRide:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET /api/rides with optional status filter
const getRides = async (req, res) => {
  try {
    const { status } = req.query;
    let rides;
    if (status) {
      rides = await Ride.find({ status });
    } else {
      rides = await Ride.find();
    }
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rides", error });
  }
};

// GET /api/rides (unfiltered)
const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rides", error: err.message });
  }
};

// PUT /api/rides/:id (update pickup, drop, status)
const updateRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { pickup, drop, status } = req.body;

    const updatedRide = await Ride.findByIdAndUpdate(
      id,
      { pickup, drop, status },
      { new: true }
    );

    res.status(200).json({ message: "Ride updated", updatedRide });
  } catch (error) {
    res.status(500).json({ message: "Error updating ride", error });
  }
};

module.exports = {
  createRide,
  getAllRides,
  getRides,
  updateRide, // ✅ Don't forget to export this!
};
