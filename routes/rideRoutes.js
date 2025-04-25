const express = require("express");
const router = express.Router();
const {
  createRide,
  getAllRides,
  getRides,
  updateRide
} = require("../controllers/rideController");
const Ride = require("../models/rideModel");

// Create a new ride
router.post("/", createRide);

// Get all rides (with optional status filter)
router.get("/", getRides);

// Update ride completely (pickup, drop, status)
router.put("/:id", updateRide);

// Delete ride by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Ride.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ride deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting ride", error: err.message });
  }
});

// Update only ride status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Ride.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: "Status updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
});

module.exports = router;
