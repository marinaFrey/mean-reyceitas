const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const UnitType = require('../models/UnitType');

router.use(cors());
router.get('/', (req, res) => {
  UnitType.find()
    .then(unitTypes => {
      res.json(unitTypes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newRecipe = new UnitType({
    name: req.body.name,
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
    name: req.body.name,
  };

  UnitType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  UnitType.findOne({ _id: req.params.id })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  UnitType.findOneAndDelete({ _id: req.params.id })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;