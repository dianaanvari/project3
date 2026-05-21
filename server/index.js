const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const Recipe = require("./server/modules/Recipe");

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the MERN Server!" });
});

// Port
const PORT = process.env.PORT || 5050;

// Start server FIRST (so it always runs)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Then try to connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });