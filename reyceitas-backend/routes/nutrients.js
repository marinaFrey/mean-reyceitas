const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Nutrient = require('../models/Nutrient');

router.use(cors());
router.get('/', (req, res) => {
  Nutrient.find()
    .populate('defaultUnit')
    .then(nutrients => {
      res.json(nutrients);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newNutrient = new Nutrient({
    name: req.body.name,
    defaultUnit: req.body.defaultUnit,
    type: req.body.type
  });

  newNutrient
    .save()
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newNutrient = new Nutrient({
    name: req.body.name,
    defaultUnit: req.body.defaultUnit,
    type: req.body.type
  });

  Nutrient.findOneAndUpdate({ _id: req.params.id }, newNutrient, { new: true })
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Nutrient.findOne({ _id: req.params.id })
    .populate('defaultUnit')
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  Nutrient.findOneAndDelete({ _id: req.params.id })
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;