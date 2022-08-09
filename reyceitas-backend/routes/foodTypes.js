const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const FoodType = require('../models/FoodType');

router.use(cors());
router.get('/', (req, res) => {
  FoodType.find()
    .then(foodTypes => {
      res.json(foodTypes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newFoodType = new FoodType({
    name: req.body.name
  });

  newFoodType
    .save()
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newData = { 
    name: req.body.name
  };

  FoodType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  FoodType.findOne({ _id: req.params.id })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  FoodType.findOneAndDelete({ _id: req.params.id })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;