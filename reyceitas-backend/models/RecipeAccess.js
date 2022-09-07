let mongoose = require("mongoose");
const Recipe = require('./Recipe');
const UserGroup = require('./UserGroup');
let Schema = mongoose.Schema;

const recipeAccessSchema = new Schema({
  userGroup: { type: Schema.Types.ObjectId, ref: UserGroup, required: true },
  recipe: { type: Schema.Types.ObjectId, ref: Recipe, required: true },
  accessLevel: { type: Number, required: true }
});

var recipeAccessModel = mongoose.model("recipeAccess", recipeAccessSchema);

module.exports = recipeAccessModel;