const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const recipes = require('./routes/recipes');

app.use('/api/recipes', recipes);

mongoose
  .connect('mongodb://db:27017/crud-node-mongo-docker', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(9000, () => console.log('Server listening on port 9000'));