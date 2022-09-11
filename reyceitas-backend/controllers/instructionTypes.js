const InstructionType = require('../models/InstructionType');

exports.find = function(req, res){
  InstructionType.find()
    .then(instructionTypes => {
      res.json(instructionTypes);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newinstructionType = new InstructionType({
    name: req.body.name
  });

  newinstructionType
    .save()
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function(req, res){
  const newData = { 
    name: req.body.name
  };

  InstructionType.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function(req, res){
  InstructionType.findOne({ _id: req.params.id })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function(req, res){
  InstructionType.findOneAndDelete({ _id: req.params.id })
    .then(instructionType => {
      res.json(instructionType);
    })
    .catch(error => res.status(500).json(error));
}