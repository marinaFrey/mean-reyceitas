const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name:         { type: String, required: true, index: true, unique:true },
  color:         { type: String }
})

module.exports = mongoose.model('tag', tagSchema);