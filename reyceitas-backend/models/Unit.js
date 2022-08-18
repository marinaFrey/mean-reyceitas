const mongoose = require('mongoose');
const { Schema } = mongoose;
const UnitType = require('./UnitType');

const unitSchema = new Schema({
  name:             { type: String, required: true, index: true, unique: true},
  abbreviation:     { type: String, required: true},
  unitType:         { type: Schema.Types.ObjectId, ref: UnitType },
})

module.exports = mongoose.model('unit', unitSchema);