const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const nutrientController = require('../controllers/nutrients');

router.use(cors());

router.get('/', nutrientController.find)
router.post('/new', jsonParser, nutrientController.new)
router.put('/edit/:id', jsonParser, nutrientController.edit)
router.get('/get/:id', jsonParser, nutrientController.get)
router.delete('/delete/:id', jsonParser, nutrientController.delete)

module.exports = router;