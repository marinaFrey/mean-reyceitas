let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = require('./User');
const Recipe = require('./Recipe');

const userFavoriteRecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User },
  recipe : { type: Schema.Types.ObjectId, ref: Recipe } 
});

var userFavoriteRecipeModel = mongoose.model("userFavoriteRecipe", userFavoriteRecipeSchema);

module.exports = userFavoriteRecipeModel;