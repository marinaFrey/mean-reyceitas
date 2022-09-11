const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()

const adminEmailController = require('../controllers/adminEmails');

router.use(cors())
router.get('/', adminEmailController.find);
router.post('/new', jsonParser, adminEmailController.new);
router.delete('/delete/:id', jsonParser, adminEmailController.delete);

module.exports = router;