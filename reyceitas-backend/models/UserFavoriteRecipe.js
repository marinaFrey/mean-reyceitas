let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = require('./User');
const Recipe = require('./Recipe');

const userFavoriteRecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true, index: true },
  recipe : { type: Schema.Types.ObjectId, ref: Recipe, required: true, index: true } 
});

var userFavoriteRecipeModel = mongoose.model("userFavoriteRecipe", userFavoriteRecipeSchema);

module.exports = userFavoriteRecipeModel;