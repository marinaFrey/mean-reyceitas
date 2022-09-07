let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const adminEmailSchema = new Schema({
  email: { type: String, required: true, index: true, unique:true }
});

var adminEmailModel = mongoose.model("adminEmail", adminEmailSchema);

module.exports = adminEmailModel;