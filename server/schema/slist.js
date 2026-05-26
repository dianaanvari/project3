const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slistSchema = new Schema({
  ingredient: {
    type: String,
    required: true
  },

  amount: {
    type: String,
    required: false
  },

  price: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model("Shopping List", slistSchema);