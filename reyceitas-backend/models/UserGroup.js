let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = require('./User');

const userGroupSchema = new Schema({
  name: { type: String, required: [true, "name not specified"] },
  users: [ { type: Schema.Types.ObjectId, ref: User } ],
  createdBy: { type: Schema.Types.ObjectId, ref: User }, 
  recipeWriteAccess:   { type: Boolean, default: false },
  groupWriteAccess:   { type: Boolean, default: false },
  recipeAccess: [{ 
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    accessLevel: Number
  }],
});

userGroupSchema.statics = {
  getGroupsByUser: function(id){
  }
}

var userGroupModel = mongoose.model("UserGroup", userGroupSchema);
module.exports = userGroupModel;