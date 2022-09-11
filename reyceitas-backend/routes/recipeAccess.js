const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const recipeAccessController = require('../controllers/recipeAccess');

router.use(cors());

router.get('/', recipeAccessController.find)
router.post('/new', jsonParser, recipeAccessController.new)
router.put('/edit/:id', jsonParser, recipeAccessController.edit)
router.get('/get/:id', jsonParser, recipeAccessController.get)
router.delete('/delete/:id', jsonParser, recipeAccessController.delete)

module.exports = router;