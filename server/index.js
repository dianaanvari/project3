const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const Recipe = require ("./modules/recipe");

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the MERN Server!" });
});
// GET 
app.get("/api/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
// POST 
app.post("/api/recipes", (req, res) => {
    console.log("POST request recieved:", req.body)
    const newRecipe = new Recipe(req.body);
    newRecipe.save()
     .then((saved) => {
        console.log("recipe saved:")
        res.json(saved);
    })
    .catch((err) => {
        console.log("save error:", err.message)
        res.status(500).json({ error: err.message });
    });
});
//put
app.put("/api/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE 
app.delete("/api/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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