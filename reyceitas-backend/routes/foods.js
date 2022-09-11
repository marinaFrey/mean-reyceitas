const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const foodController = require('../controllers/foods');

router.use(cors());

router.get('/', foodController.find);
router.post('/new', jsonParser, foodController.new)
router.put('/edit/:id', jsonParser, foodController.edit)
router.get('/get/:id', jsonParser, foodController.get)
router.delete('/delete/:id', jsonParser, foodController.delete)

module.exports = router;