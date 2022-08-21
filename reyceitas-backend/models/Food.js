const mongoose = require('mongoose');
const { Schema } = mongoose;
const FoodType = require('./FoodType');
const Nutrient = require('./Nutrient');

const foodSchema = new Schema({
  name:         { type: String, required: true, index: true, unique: true},
  foodType:     { type: Schema.Types.ObjectId, ref: FoodType },
  density:      { type: Number },
  nutrients:    [{
    nutrient:     { type: Schema.Types.ObjectId, ref: Nutrient },
    amount:       { type: Number }
  }]
})

module.exports = mongoose.model('food', foodSchema);