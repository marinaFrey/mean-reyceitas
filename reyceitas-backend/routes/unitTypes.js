const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const unitTypeController = require('../controllers/unitTypes');

router.use(cors());

router.get('/', unitTypeController.find)
router.post('/new', jsonParser, unitTypeController.new)
router.put('/edit/:id', jsonParser, unitTypeController.edit)
router.get('/get/:id', jsonParser, unitTypeController.get)
router.delete('/delete/:id', jsonParser, unitTypeController.delete)

module.exports = router;