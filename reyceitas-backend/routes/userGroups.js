const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()

const UserGroup = require('../models/UserGroup');

router.use(cors())
router.get('/', (req, res) => {
  UserGroup.find()
    .then(userGroups => {
      res.json(userGroups);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newuserGroup = new UserGroup({
    name: req.body.name,
    users: req.body.users,
  });

  newuserGroup
    .save()
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', jsonParser, (req, res) => {
  const newData = { 
    name: req.body.name,
    users: req.body.users,
  };

  UserGroup.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/get/:id', jsonParser, (req, res) => {
  UserGroup.findOne({ _id: req.params.id })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
});


router.delete('/delete/:id', jsonParser, (req, res) => {
  UserGroup.findOneAndDelete({ _id: req.params.id })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;