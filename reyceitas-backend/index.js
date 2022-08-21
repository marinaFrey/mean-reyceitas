require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const http = require('http');
const https = require('https');

const verifyJWT = require('./config/auth');
const seeds = require('./seeds/base');

const recipes = require('./routes/recipes');
const tags= require('./routes/tags');
const dbs = require('./routes/db');
const nutrients = require('./routes/nutrients');
const foods = require('./routes/foods');
const foodTypes = require('./routes/foodTypes');
const instructionTypes = require('./routes/instructionTypes');
const units = require('./routes/units');
const unitTypes = require('./routes/unitTypes');
const users = require('./routes/users');
const images = require('./routes/images');
const serveStatic = require('serve-static')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//app.use('/api/recipes', verifyJWT, recipes);
app.use('/api/recipes', recipes);
app.use('/api/foods', foods);
app.use('/api/food-types', foodTypes);
app.use('/api/instruction-types', instructionTypes);
app.use('/api/units', units);
app.use('/api/unit-types', unitTypes);
app.use('/api/nutrients', nutrients);
app.use('/api/tags', tags);
app.use('/db', dbs);
app.use('/auth', users);
app.use('/img/', images);
app.use('/uploads', serveStatic('/uploads'));
  
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
    //mongoose.connection.db.dropDatabase(seeds); //Drop and seed
    // seeds() //Only seed
})
.catch(error => {
    console.log(error);
});

const { privateKey } = JSON.parse(process.env.PRIVATE_KEY)
const { certificate } = JSON.parse(process.env.CERT)

var credentials = {key: privateKey , cert: certificate };

//app.listen(8999, () => console.log('Server listening on port 8999'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8998);
httpsServer.listen(8999);