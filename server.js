const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const rideRoutes = require("./routes/rideRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 NEW LINE

// ✅ Use Routes
app.use("/api/rides", rideRoutes);
app.use("/api/auth", authRoutes); // 👈 NEW LINE

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚖 Taxi Booking App API Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
