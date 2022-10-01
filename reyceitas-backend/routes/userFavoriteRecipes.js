const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const userFavoriteRecipesController = require('../controllers/userFavoriteRecipes');

router.use(cors());

router.get('/', userFavoriteRecipesController.find)
router.post('/new', jsonParser, userFavoriteRecipesController.new)
router.put('/toggle/:id', jsonParser, userFavoriteRecipesController.new)
router.delete('/delete/:id', jsonParser, userFavoriteRecipesController.delete)

module.exports = router;