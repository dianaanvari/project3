const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
 items: [String],
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  }
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);