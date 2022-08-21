const express = require('express');
const cors = require('cors');
const router = express.Router();
const mongoose = require('mongoose');
const seeds = require('../seeds/base');

router.use(cors());
router.get('/drop', (req, res) => {
    mongoose.connection.db.dropDatabase();
});
router.get('/seed', (req, res) => {
    seeds()
    res.json("OK");
});


module.exports = router;