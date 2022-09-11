const RecipeAccess = require('../models/RecipeAccess');

exports.find = function(req, res){
  RecipeAccess.find()
    .then(recipeAccesses => {
      res.json(recipeAccesses);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newrecipeAccess = new RecipeAccess({
    userGroup: req.body.userGroup,
    recipe: req.body.recipe,
    accessLevel: req.body.accessLevel,
  });

  newrecipeAccess
    .save()
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function(req, res){
  const newData = { 
    userGroup: req.body.userGroup,
    recipe: req.body.recipe,
    accessLevel: req.body.accessLevel,
  };

  RecipeAccess.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function(req, res){
  RecipeAccess.findOne({ _id: req.params.id })
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function(req, res){
  RecipeAccess.findOneAndDelete({ _id: req.params.id })
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => res.status(500).json(error));
}