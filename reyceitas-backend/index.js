require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const recipes = require('./routes/recipes');
const seeds = require('./seeders/base');

const foods = require('./routes/foods');
const foodTypes = require('./routes/foodTypes');
const instructionTypes = require('./routes/instructionTypes');
const units = require('./routes/units');
const unitTypes = require('./routes/unitTypes');
const users = require('./routes/users');
const images = require('./routes/images');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']?.split(" ");
    if (!authHeader) return res.status(401).json({ auth: false, message: 'No token provided.' });
    const token = authHeader[1];
    
    jwt.verify(token, process.env.CLIENT_SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}
app.use('/api/recipes', verifyJWT, recipes);
//app.use('/api/recipes', recipes);
app.use('/api/foods', foods);
app.use('/api/food-types', foodTypes);
app.use('/api/instruction-types', instructionTypes);
app.use('/api/units', units);
app.use('/api/unit-types', unitTypes);
app.use('/auth', users);
app.use('/img/', images);
app.use('/uploads', express.static(__dirname));
  
db = 'mongodb://db:27017/reyceitas-mean'
mongoose.connect(
    db,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(result => {
    console.log('Connected to MongoDB');
    mongoose.connection.db.dropDatabase(seeds); //Drop and seed
    // seeds() //Only seed
})
.catch(error => {
    console.log(error);
});
app.listen(9000, () => console.log('Server listening on port 9000'));