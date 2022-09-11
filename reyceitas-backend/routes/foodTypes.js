const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const foodTypeController = require('../controllers/foodTypes');

router.use(cors());

router.get('/', foodTypeController.find)
router.post('/new', jsonParser, foodTypeController.new)
router.put('/edit/:id', jsonParser, foodTypeController.edit)
router.get('/get/:id', jsonParser, foodTypeController.get)
router.delete('/delete/:id', jsonParser, foodTypeController.delete)

module.exports = router;