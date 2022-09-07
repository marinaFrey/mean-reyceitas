const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unit = require('./Unit');
const User = require('./User');
const Food = require('./Food');
const Tag = require('./Tag');
const InstructionType = require('../models/InstructionType');

const recipeSchema = new Schema({
  title:        { type: String, required: true },
  createdAt:    { type: Date, default: Date.now },
  createdBy:    { type: Schema.Types.ObjectId, ref: User },
  difficulty:   { type: Number },
  pictures:     [ String ],
  servings:     { type: Number, required: true },
  ingredients:  [{ 
    amount: Number, 
    unit:       { type: Schema.Types.ObjectId, ref: Unit },
    food:       { type: Schema.Types.ObjectId, ref: Food },
    details: String
  }],
  tags: [ { type: Schema.Types.ObjectId, ref: Tag, index: true } ],
  isPublic:   { type: Boolean, default: true },
  instructions: [{
    description: String,
    instructionType: { type: Schema.Types.ObjectId, ref: InstructionType },
    //relatedRecipesId: [{ type: Schema.Types.ObjectId, ref: recipeSchema}]
  }]
});

module.exports = mongoose.model('recipe', recipeSchema);