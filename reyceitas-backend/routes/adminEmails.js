const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()

const AdminEmail = require('../models/AdminEmail');

router.use(cors())
router.get('/', (req, res) => {
  AdminEmail.find()
    .then(adminEmails => {
      res.json(adminEmails);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/new', jsonParser,(req, res) => {
  const newadminEmail = new AdminEmail({
    user: req.body.user,
    recipe: req.body.recipe,
  });

  newadminEmail
    .save()
    .then(adminEmail => {
      res.json(adminEmail);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/delete/:id', jsonParser, (req, res) => {
  AdminEmail.findOneAndDelete({ _id: req.params.id })
    .then(adminEmail => {
      res.json(adminEmail);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;