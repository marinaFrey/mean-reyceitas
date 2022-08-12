const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Recipe = require('../models/Recipe');

router.use(cors());
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newRecipe= new Recipe({ 
    title: req.body.title,
    createdBy: req.userId,
    servings: req.body.servings,
    ingredients: req.body.ingredients, 
    difficulty: req.body.difficulty,
    instructions: req.body.instructions
  });

  newRecipe
    .save()
    .then(unitType => {
      res.json(unitType);
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
    .then(newRecipe => {
      res.json(newRecipe._id ); //Returning only the id
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .populate('createdBy')
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