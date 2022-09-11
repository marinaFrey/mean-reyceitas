const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const instructionTypeController = require('../controllers/instructionTypes');

router.use(cors());

router.get('/', instructionTypeController.find)
router.post('/new', jsonParser, instructionTypeController.new)
router.put('/edit/:id', jsonParser, instructionTypeController.edit)
router.get('/get/:id', jsonParser, instructionTypeController.get)
router.delete('/delete/:id', jsonParser, instructionTypeController.delete)

module.exports = router;