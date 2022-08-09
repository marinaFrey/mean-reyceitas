const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unit = require('../models/Unit');
const Food = require('../models/Food');
const InstructionType = require('../models/InstructionType');

const recipeSchema = new Schema({
  title:        { type: String, required: true },
  createdAt:    { type: Date, default: Date.now },
  createdBy:    { type: String, required: true },
  difficulty:   { type: Number },
  servings:     { type: Number, required: true },
  ingredients:  [{ 
    amount: Number, 
    unit:       { type: Schema.Types.ObjectId, ref: Unit },
    food:       { type: Schema.Types.ObjectId, ref: Food },
    details: String
  }],
  instructions: [{
    description: String,
    instructionType: { type: Schema.Types.ObjectId, ref: InstructionType },
    //relatedRecipesId: [{ type: Schema.Types.ObjectId, ref: recipeSchema}]
  }]
});

module.exports = mongoose.model('recipe', recipeSchema);