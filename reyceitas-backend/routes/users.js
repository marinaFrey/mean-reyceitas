const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { json } = require('body-parser');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.CLIENT_ID);

var jsonParser = bodyParser.json()

const User = require('../models/User');

router.use(cors())
router.get('/users', (req, res) => {
  User.find()
    .then(units => {
      res.json(units);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/', jsonParser, (req, res) => {
    const token = req.body.token;
    if(token) {
        const decode = jwt.verify(token, process.env.CLIENT_SECRET);
        res.json({
            login: true,
            data: decode
        });
    } else {
        res.json({
            login: false,
            data: 'error'
        });
    }
});
router.post("/login", jsonParser, (req,res,next) => {
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken : req.body.token,
            audience : process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userDetails = {
            email : payload['email'],
            profilePicture : payload['picture'],
            firstName : payload['given_name'],
            lastName : payload['family_name']
        }
        const newUser = new User({ 
            ...userDetails,
            source: payload['iss']
        })
        newUser.save()
            .then(user => {
                userDetails.id = user._id
                let token = jwt.sign(userDetails, process.env.CLIENT_SECRET, {expiresIn: 1440});
                res.status(200).json({ token: token, ...userDetails })
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
    verify().catch((e) => {res.status(401).json({"Error":"Not authorized"})});
})
module.exports = router;