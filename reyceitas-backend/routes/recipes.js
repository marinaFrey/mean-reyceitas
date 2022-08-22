const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Recipe = require('../models/Recipe');
const Tag = require('../models/Tag');
const recipeShort =  'title createdAt createdBy difficulty servings pictures tags'
router.use(cors());
router.get('/', (req, res) => {
  Recipe.find().select(recipeShort)
    .populate('tags')
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/search-by-tag/:id', jsonParser, (req, res) => {
  Tag.findOne({ _id: req.params.id }).then(tag => {
    Recipe.find({tags: { $elemMatch: { $eq: tag} }}).select('title')
      .populate('tags')
      .then(recipes => {
        res.json(recipes);
      })
      .catch(error => res.status(500).json(error));
    })
    .catch(error => res.status(500).json(error));
});

router.get('/search-by-tagname/:tag', (req, res) => {
  Tag.findOne({name: req.params.tag}).then(tag =>{
    Recipe.find({tags: { $elemMatch: { $eq: tag} }}).select('title')
      .populate('tags')
      .then(recipes => {
        res.json(recipes);
      })
      .catch(error => res.status(500).json(error));
  })
});
router.get('/search-by-name', (req, res) => {
  Recipe.find().select(recipeShort)
    .populate('tags')
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => res.status(500).json(error));
});
router.get('/search-by-name/:name', (req, res) => {
  Recipe.find({title: {$regex: req.params.name, $options: 'i'}}).select(recipeShort)
    .populate('tags')
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
    pictures: req.body.pictures,
    tags: req.body.tags,
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
    pictures: req.body.pictures,
    difficulty: req.body.difficulty,
    tags: req.body.tags,
    instructions: req.body.instructions
  };

  Recipe.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(newRecipe => {
      res.json(newRecipe ); //Returning only the id
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .populate('createdBy')
    .populate('tags')
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