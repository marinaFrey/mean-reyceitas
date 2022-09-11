const Recipe = require('../models/Recipe');

const recipeShort =  'title createdAt createdBy difficulty servings pictures tags'

exports.searchByName = function(req, res){
  if(req.params.name)
    searchParameters = { title: {$regex: req.params.name, $options: 'i'}}
  else
    searchParameters = {};

  Recipe.find(searchParameters)
    .select(recipeShort)
    .populate('tags')
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
}

exports.searchByTag = function(tag){
  if(tag)
    searchParameters = {tags: { $elemMatch: { $eq: tag} }}
  else
    searchParameters = {};

  Recipe.find(searchParameters)
    .select('title')
    .populate('tags')
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
}


exports.new = function(req, res){
  const newRecipe= new Recipe({ 
    title: req.body.title,
    createdBy: req.userId,
    servings: req.body.servings,
    ingredients: req.body.ingredients, 
    difficulty: req.body.difficulty,
    isPublic: req.body.isPublic,
    pictures: req.body.pictures,
    tags: req.body.tags,
    instructions: req.body.instructions,
    notes: req.body.notes
  });

  newRecipe
    .save()
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
}

exports.edit = function (req, res) {
  Recipe.edit(req.params.id, req.body)
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error)
    });
}

exports.get = function (req, res) {
  Recipe.load(req.params.id)
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error)
    });
}


exports.delete = function (req, res) {
  Recipe.delete(req.params.id)
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error)
    });
}