const UserFavoriteRecipe = require('../models/UserFavoriteRecipe');
const recipeShort =  'title createdAt createdBy difficulty servings pictures tags'

exports.find = function (req, res) {
  UserFavoriteRecipe.find({user: req.userId})
    .populate('recipe')
    .select(recipeShort)
    .populate('tags')
    .then(userFavoriteRecipes => {
      var userFavoriteRecipeList = []
      userFavoriteRecipes.map(u => userFavoriteRecipeList.push(u.recipe))
      res.json(userFavoriteRecipeList);
    })
    .catch(error => res.status(500).json(error));
}


//Edit: PUT 
//User from authorization header
//Recipe from URL
//Toggle from body ({toggle})

exports.edit = function(req,res) {
  const user = req.userId;
  const recipe = req.params.id;
  const toggle = req.body.toggle;

  if(toggle === true){
    const newuserFavoriteRecipe = new UserFavoriteRecipe({user: user, recipe: recipe });
    newuserFavoriteRecipe
      .save()
      .then(userFavoriteRecipe => {
        res.json(userFavoriteRecipe);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }

  if(toggle === false){
    UserFavoriteRecipe.deleteMany({user: user, recipe: recipe})
      .then(userFavoriteRecipe => {
        res.json(userFavoriteRecipe);
      })
      .catch(error => res.status(400).json(error));
  }
}

exports.new = function (req, res) {
  const newuserFavoriteRecipe = new UserFavoriteRecipe({
    user: req.body.user,
    recipe: req.body.recipe,
  });

  newuserFavoriteRecipe
    .save()
    .then(userFavoriteRecipe => {
      res.json(userFavoriteRecipe);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.delete = function (req, res) {
  UserFavoriteRecipe.findOneAndDelete({ _id: req.params.id })
    .then(userFavoriteRecipe => {
      res.json(userFavoriteRecipe);
    })
    .catch(error => res.status(500).json(error));
}
