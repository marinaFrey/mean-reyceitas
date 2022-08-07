
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array  
  },
  instructions: {
    type: Array 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String, //Should become Object ID
    required: true
  },
  difficulty: {
    type: Number
  },
  servings: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('recipe', recipeSchema);