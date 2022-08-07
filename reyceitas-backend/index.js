require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const recipes = require('./routes/recipes');
const app = express();
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/recipes', recipes);

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
  
app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

app.get("/auth/logout", (req, res) => {
  req.flash("success", "Successfully logged out");
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});
app.post("/login", (req,res,next) => {
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken : req.body.token,
            audience : process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userDetails = {
            email : payload['email'],
            firstname : payload['given_name'],
            lastname : payload['family_name']
        }
        let token = jwt.sign(userDetails, process.env.CLIENT_SECRET, {expiresIn: 1440});
        res.status(200).json({ token: token })
    }
    verify().catch(res.status(401));
})
db = 'mongodb://db:27017/reyceitas-mean'
mongoose.connect(
    db,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(9000, () => console.log('Server listening on port 9000'));