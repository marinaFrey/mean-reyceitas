const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodTypeSchema = new Schema({
  name:         { type: String, required: true},
})

module.exports = mongoose.model('foodType', foodTypeSchema);