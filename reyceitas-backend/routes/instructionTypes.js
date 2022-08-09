const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const InstructionType = require('../models/InstructionType');

router.use(cors());
router.get('/', (req, res) => {
  InstructionType.find()
    .then(instructionTypes => {
      res.json(instructionTypes);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newinstructionType = new InstructionType({
    name: req.body.name
  });

  newinstructionType
    .save()
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newData = { 
    name: req.body.name
  };

  InstructionType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  InstructionType.findOne({ _id: req.params.id })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  InstructionType.findOneAndDelete({ _id: req.params.id })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;