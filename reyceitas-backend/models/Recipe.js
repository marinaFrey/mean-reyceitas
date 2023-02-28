const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unit = require('./Unit');
const User = require('./User');
const Food = require('./Food');
const Tag = require('./Tag');
const fs = require('fs');
const InstructionType = require('../models/InstructionType');

const RecipeSchema = new Schema({
  title:        { type: String, required: true },
  createdAt:    { type: Date, default: Date.now },
  createdBy:    { type: Schema.Types.ObjectId, ref: User },
  difficulty:   { type: Number },
  pictures:     [ String ],
  servings:     { type: Number, required: true },
  ingredients:  [{ 
    amount: Number, 
    unit:       { type: Schema.Types.ObjectId, ref: Unit },
    food:       { type: Schema.Types.ObjectId, ref: Food },
    details: String
  }],
  tags: [ { type: Schema.Types.ObjectId, ref: Tag, index: true } ],
  isPublic:   { type: Boolean, default: true },
  instructions: [{
    description: String,
    instructionType: { type: Schema.Types.ObjectId, ref: InstructionType },
    //relatedRecipesId: [{ type: Schema.Types.ObjectId, ref: recipeSchema}]
  }],
  groupAccess: [{ 
    group: { type: Schema.Types.ObjectId, ref: 'UserGroup' },
    accessLevel: Number
  }],
  notes:   { type: String },
});
function removeImage(path){
  fs.unlink('/uploads/'+path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}
RecipeSchema.method( {
  cleanUploads: function(newImages){
    toRemove = this.pictures.filter( function( el ) {
      return newImages.indexOf( el ) < 0;
    } ); 
    toRemove.forEach(removeImage)
  }
});
/*RecipeSchema.pre('delete', function(next) {
  console.log("Pre remove")
  next();
});*/
RecipeSchema.statics = {
  load: function(_id){
    return this.findOne({ _id })
      .populate('createdBy', 'firstName lastName profilePicture')
      .populate('tags')
      .populate('groupAccess.group', 'name')
      .populate({
        path:'ingredients.unit',
        populate: {
          path: "unitType"
        },
        model: 'unit'
      })
      .populate({
        path:'ingredients.food',
        populate: {
          path: "foodType"
        },
        model: 'food'
      })
      .populate({
        path:'instructions.instructionType',
        model: 'instructionType'
      })
      .exec()
  },
  delete: function(id ){
    return this.findOne({_id: id})
    .then(recipe => {
      recipe.cleanUploads([])
    })
    .then(() => {
      return this.findOneAndDelete({ _id: id });
    })
  },
}

module.exports = mongoose.model('Recipe', RecipeSchema);