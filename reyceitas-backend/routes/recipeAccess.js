const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()

const RecipeAccess = require('../models/RecipeAccess');

router.use(cors())
router.get('/', (req, res) => {
  RecipeAccess.find()
    .then(recipeAccesses => {
      res.json(recipeAccesses);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
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
});

router.put('/edit/:id', jsonParser, (req, res) => {
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
});

router.get('/get/:id', jsonParser, (req, res) => {
  RecipeAccess.findOne({ _id: req.params.id })
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  RecipeAccess.findOneAndDelete({ _id: req.params.id })
    .then(recipeAccess => {
      res.json(recipeAccess);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;