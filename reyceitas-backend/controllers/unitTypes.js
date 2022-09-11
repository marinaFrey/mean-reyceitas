const UnitType = require('../models/UnitType');

exports.find = function (req, res) {
  UnitType.find()
    .then(unitTypes => {
      res.json(unitTypes);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function (req, res) {
  const newRecipe = new UnitType({
    name: req.body.name,
  });

  newRecipe
    .save()
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function (req, res) {
  const newData = { 
    name: req.body.name,
  };

  UnitType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function (req, res) {
  UnitType.findOne({ _id: req.params.id })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function (req, res) {
  UnitType.findOneAndDelete({ _id: req.params.id })
    .then(unitType => {
      res.json(unitType);
    })
    .catch(error => res.status(500).json(error));
}