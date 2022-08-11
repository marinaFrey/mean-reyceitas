const mongoose = require('mongoose');
const { Schema } = mongoose;

const instructionTypeSchema = new Schema({
  name:         { type: String, required: true, index:true, unique:true},
})

module.exports = mongoose.model('instructionType', instructionTypeSchema);