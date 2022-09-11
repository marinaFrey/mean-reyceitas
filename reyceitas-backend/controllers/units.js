const Unit = require('../models/Unit');

exports.find = function (req, res) {
  Unit.find()
    .populate('unitType')
    .then(units => {
      res.json(units);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function (req, res) {
  const newUnit = new Unit({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    unitType: req.body.unitType
  });

  newUnit
    .save()
    .then(unit => {
      res.json(unit);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function (req, res) {
  const newData = { 
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    unitType: req.body.unitType
  };

  Unit.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function (req, res) {
  Unit.findOne({ _id: req.params.id })
    .populate('unitType')
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function (req, res) {
  Unit.findOneAndDelete({ _id: req.params.id })
    .then(unit => {
      res.json(unit);
    })
    .catch(error => res.status(500).json(error));
};