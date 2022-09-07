const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()

const UserFavoriteRecipe = require('../models/UserFavoriteRecipe');

router.use(cors())
router.get('/', (req, res) => {
  UserFavoriteRecipe.find()
    .then(userFavoriteRecipes => {
      res.json(userFavoriteRecipes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
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
});

router.delete('/delete/:id', jsonParser, (req, res) => {
  UserFavoriteRecipe.findOneAndDelete({ _id: req.params.id })
    .then(userFavoriteRecipe => {
      res.json(userFavoriteRecipe);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;