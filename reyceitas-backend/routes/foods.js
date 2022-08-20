const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Food = require('../models/Food');

router.use(cors());
router.get('/', (req, res) => {
  Food.find()
    .populate({
      path:'nutrients',
      populate: {
        path: "nutrient"
      },
      model: 'nutrient'
    })
    .then(foods => {
      res.json(foods);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newFood = new Food({
    name: req.body.name,
    foodType: req.body.foodType
  });

  newFood
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
    name: req.body.name,
    foodType: req.body.foodType
  };

  Food.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Food.findOne({ _id: req.params.id })
    .populate({
      path:'nutrients',
      populate: {
        path: "nutrient"
      },
      model: 'nutrient'
    })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  Food.findOneAndDelete({ _id: req.params.id })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;