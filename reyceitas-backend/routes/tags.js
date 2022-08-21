const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const Tag = require('../models/Tag');

router.use(cors());
router.get('/', (req, res) => {
  Tag.find()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newTag = new Tag({
    name: req.body.name
  });

  newTag
    .save()
    .then(tag => {
      res.json(tag);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newTag = { 
    name: req.body.name
  };

  Tag.findOneAndUpdate({ _id: req.params.id }, newTag, { new: true })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  Tag.findOne({ _id: req.params.id })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  Tag.findOneAndDelete({ _id: req.params.id })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;