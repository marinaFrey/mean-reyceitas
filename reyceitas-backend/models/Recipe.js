
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('recipe', recipeSchema);