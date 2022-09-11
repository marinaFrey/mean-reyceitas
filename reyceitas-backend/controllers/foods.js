const Food = require('../models/Food');

exports.find = function(req, res){
  Food.find().select('name')
    .then(foods => {
      res.json(foods);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newFood = new Food({
    name: req.body.name,
    foodType: req.body.foodType
  });

  newFood
    .save()
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function (req, res) {
  const newData = { 
    name: req.body.name,
    foodType: req.body.foodType
  };

  Food.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function (req, res) {
  Food.findOne({ _id: req.params.id })
    .populate({
      path:'nutrients',
      populate: {
        path: "nutrient"
      },
      model: 'nutrient'
    })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function (req, res) {
  Food.findOneAndDelete({ _id: req.params.id })
    .then(food => {
      res.json(food);
    })
    .catch(error => res.status(500).json(error));
}
