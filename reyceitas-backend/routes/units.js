const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const unitController = require('../controllers/units');

router.use(cors());

router.get('/', unitController.find)
router.post('/new', jsonParser, unitController.new)
router.put('/edit/:id', jsonParser, unitController.edit)
router.get('/get/:id', jsonParser, unitController.get)
router.delete('/delete/:id', jsonParser, unitController.delete)

module.exports = router;