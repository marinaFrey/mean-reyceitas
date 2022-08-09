const mongoose = require('mongoose');
const { Schema } = mongoose;
const FoodType = require('../models/FoodType');

const foodSchema = new Schema({
  name:         { type: String, required: true},
  foodType:         { type: Schema.Types.ObjectId, ref: FoodType },
})

module.exports = mongoose.model('food', foodSchema);