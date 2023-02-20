const Recipe = require('../models/Recipe');

// For the specialized search
const UserFavoriteRecipe = require('../models/UserFavoriteRecipe');
const UserGroup = require('../models/UserGroup');

const recipeShort =  'title createdAt createdBy difficulty servings pictures tags'

//Parameters to add inside recipe: isFavorite, canEdit
exports.searchByName = function(req, res){
  //UserGroup.find().select('name').then(userGroups => {console.log(userGroups)})
  //Recipe.find().select('title isPublic createdBy').then(userGroups => {console.log(userGroups)})
  if(req.params.name)
    searchParameters = { title: {$regex: req.params.name, $options: 'i'}}
  else
    searchParameters = {};
  UserFavoriteRecipe.find({user: req.userId }).select('recipe')
  .then(userFavoriteRecipes => {
    var userFavoriteRecipesList = []
    userFavoriteRecipes.forEach(u => {userFavoriteRecipesList.push(u.recipe.toString())})

    Recipe.find({ $and:[ searchParameters, { $or: [ {'isPublic': true}, {'createdBy': req.userId }] } ]})
      .select(recipeShort)
      .populate('tags')
      .then(recipes => {
        var recipeList = []
        recipes.forEach(recipe => {
          const isFavorite = userFavoriteRecipesList?.includes(recipe._id.toString());
          recipeList.push({isFavorite, ...recipe._doc })
        })
        res.json(recipeList);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  })

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
//  console.log(req.body)
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
//  console.log(req.body)
 //check if user can edit and if it is owner
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
      UserFavoriteRecipe.findOne({user: req.userId, recipe: req.params.id })
      .then(userFavoriteRecipe => {
        var isFavorite = userFavoriteRecipe ? true : false;
        if(req.userId == recipe.createdBy.id){
          UserGroup.find({user: req.userId}).then(userGroups =>{
            recipe._doc.groupAccess = userGroups
            res.json({isFavorite, ...recipe._doc } );
          })
        } else {
          res.json({isFavorite, ...recipe._doc } );
        }
      })
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