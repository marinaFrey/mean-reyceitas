const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
const Recipe = require('../models/Recipe');
var corsOptions = {
  origin: 'https://api.mysite.com/',
  optionsSuccessStatus: 200
};

router.use(cors());
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newRecipe = new Recipe({
    title: req.body.title,
    createdBy: req.body.createdBy,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    difficulty: req.body.difficulty,
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
  const newData = { 
    title: req.body.title,
    createdBy: req.body.createdBy,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    difficulty: req.body.difficulty,
    instructions: req.body.instructions
  };

  Recipe.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
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