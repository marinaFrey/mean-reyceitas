const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name:         { type: String, required: true, index: true, unique:true },
})

module.exports = mongoose.model('tag', tagSchema);