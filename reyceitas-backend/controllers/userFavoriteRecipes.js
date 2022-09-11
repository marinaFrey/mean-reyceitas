const UserFavoriteRecipe = require('../models/UserFavoriteRecipe');

exports.find = function (req, res) {
  UserFavoriteRecipe.find()
    .then(userFavoriteRecipes => {
      res.json(userFavoriteRecipes);
    })
    .catch(error => res.status(500).json(error));
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
