const mongoose = require('mongoose');
const { Schema } = mongoose;
const Unit = require('./Unit');

const nutrientSchema = new Schema({
  name:         { type: String, required: true, index: true, unique:true},
  type:         { type: String, required: true, index: true },
  defaultUnit:  { type: Schema.Types.ObjectId, ref: Unit, required: true },
})

module.exports = mongoose.model('nutrient', nutrientSchema);