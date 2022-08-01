const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
const Recipe = require('../models/Recipe');

router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
    console.log(req.body)
  const newRecipe = new Recipe({
    name: req.body.name,
    instructions: req.body.instructions
  });

  newRecipe
    .save()
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newData = { name: req.body.name, instructions: req.body.instructions };

  Recipe.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  const newData = { name: req.body.name, instructions: req.body.instructions };

  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  Recipe.findOneAndDelete({ _id: req.params.id })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;