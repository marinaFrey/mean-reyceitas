const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();

var jsonParser = bodyParser.json()
 
const userGroupsController = require('../controllers/userGroups');

router.use(cors());

router.get('/', userGroupsController.find)
router.post('/new', jsonParser, userGroupsController.new)
router.put('/edit/:id', jsonParser, userGroupsController.edit)
router.get('/get/:id', jsonParser, userGroupsController.get)
router.delete('/delete/:id', jsonParser, userGroupsController.delete)

module.exports = router;