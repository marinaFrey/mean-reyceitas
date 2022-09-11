const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const tagController = require('../controllers/tags');

router.use(cors());

router.get('/', tagController.find)
router.post('/new', jsonParser, tagController.new)
router.put('/edit/:id', jsonParser, tagController.edit)
router.get('/get/:id', jsonParser, tagController.get)
router.delete('/delete/:id', jsonParser, tagController.delete)

module.exports = router;