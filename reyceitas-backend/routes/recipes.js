const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

const recipesController = require('../controllers/recipes');

var jsonParser = bodyParser.json()
 
const {verifyJWT} = require('../config/auth');
const Recipe = require('../models/Recipe');
const Tag = require('../models/Tag');

router.use(cors());
router.get('/', recipesController.searchByName)

router.get('/search-by-tag/:id', jsonParser, (req, res) => {
  Tag.findOne({ _id: req.params.id })
    .then(tag =>{
      recipesController.searchByTag(tag)
    })
  .catch(error => res.status(500).json(error));
});

router.get('/search-by-tagname/:tagname', (req, res) => {
  Tag.findOne({name: req.params.tagname})
    .then(tag =>{
      recipesController.searchByTag(tag)
    })
  .catch(error => res.status(500).json(error));
});
router.get('/search-by-name/', recipesController.searchByName);
router.get('/search-by-name/:name', recipesController.searchByName);
router.post('/new', [verifyJWT, jsonParser], recipesController.new);
router.put('/edit/:id', [verifyJWT, jsonParser], recipesController.edit);
router.get('/get/:id', [verifyJWT, jsonParser], recipesController.get);
router.delete('/delete/:id', [verifyJWT, jsonParser], recipesController.delete);
module.exports = router;