const Nutrient = require('../models/Nutrient');

exports.find = function(req, res){
  Nutrient.find()
    .populate('defaultUnit')
    .then(nutrients => {
      res.json(nutrients);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newNutrient = new Nutrient({
    name: req.body.name,
    defaultUnit: req.body.defaultUnit,
    type: req.body.type
  });

  newNutrient
    .save()
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function(req, res){
  const newNutrient = new Nutrient({
    name: req.body.name,
    defaultUnit: req.body.defaultUnit,
    type: req.body.type
  });

  Nutrient.findOneAndUpdate({ _id: req.params.id }, newNutrient, { new: true })
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function(req, res){
  Nutrient.findOne({ _id: req.params.id })
    .populate('defaultUnit')
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function(req, res){
  Nutrient.findOneAndDelete({ _id: req.params.id })
    .then(nutrient => {
      res.json(nutrient);
    })
    .catch(error => res.status(500).json(error));
}