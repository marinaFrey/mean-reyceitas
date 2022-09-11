const FoodType= require('../models/FoodType');

exports.find = function(req, res){
  FoodType.find()
    .then(foodTypes => {
      res.json(foodTypes);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newFoodType = new FoodType({
    name: req.body.name
  });

  newFoodType
    .save()
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function(req, res){
  const newData = { 
    name: req.body.name
  };

  FoodType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function(req, res){
  FoodType.findOne({ _id: req.params.id })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function(req, res){
  FoodType.findOneAndDelete({ _id: req.params.id })
    .then(foodType => {
      res.json(foodType);
    })
    .catch(error => res.status(500).json(error));
}