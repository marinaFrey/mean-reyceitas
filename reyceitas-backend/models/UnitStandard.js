const mongoose = require('mongoose');
const { Schema } = mongoose;
const UnitType = require('./UnitType');
const Unit = require('./Unit');

const unitStandardSchema = new Schema({
  unitType:         { type: Schema.Types.ObjectId, ref: UnitType , required: true, index: true, unique:true },
  standardUnit:     { type: Schema.Types.ObjectId, ref: Unit , required: true, index: true},
  conversionRates:  [{
    unit:               { type: Schema.Types.ObjectId, ref: Unit, required: true, index: true},
    conversionRate:     { type: mongoose.Decimal128, required: true }
  }]
})

module.exports = mongoose.model('unitStandard', unitStandardSchema);