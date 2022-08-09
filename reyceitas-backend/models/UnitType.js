const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitTypeSchema = new Schema({
  name:         { type: String, required: true},
})

module.exports = mongoose.model('unitType', unitTypeSchema);