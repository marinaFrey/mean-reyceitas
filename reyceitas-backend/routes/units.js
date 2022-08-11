const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Unit = require('../models/Unit');

router.use(cors());
router.get('/', (req, res) => {
  Unit.find()
    .populate('unitType')
    .then(units => {
      res.json(units);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newRecipe = new Unit({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    unitType: req.body.unitType
  });

  newRecipe
    .save()
    .then(unit => {
      res.json(unit);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newData = { 
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    unitType: req.body.unitType
  };

  Unit.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Unit.findOne({ _id: req.params.id })
    .populate('unitType')
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  Unit.findOneAndDelete({ _id: req.params.id })
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;