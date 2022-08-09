require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const recipes = require('./routes/recipes');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const app = express();

const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']?.split(" ");
    const token = authHeader[1];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.CLIENT_SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      console.log(decoded)
      next();
    });
}
app.use('/api/recipes', verifyJWT, recipes);
  
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
app.get('/auth', (req, res) => {
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
app.post("/login", (req,res,next) => {
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
        let token = jwt.sign(userDetails, process.env.CLIENT_SECRET, {expiresIn: 1440});
        res.status(200).json({ token: token, ...userDetails })
    }
    verify().catch((e) => {res.status(401).json({"Error":"Not authorized"})});
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