const mongoose = require('mongoose');
const { Schema } = mongoose;

const instructionTypeSchema = new Schema({
  name:         { type: String, required: true},
})

module.exports = mongoose.model('instructionType', instructionTypeSchema);