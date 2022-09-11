const Tag = require('../models/Tag');

exports.find = function(req, res){
  Tag.find()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newTag = new Tag({
    name: req.body.name
  });

  newTag
    .save()
    .then(tag => {
      res.json(tag);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function(req, res){
  const newTag = { 
    name: req.body.name
  };

  Tag.findOneAndUpdate({ _id: req.params.id }, newTag, { new: true })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function(req, res){
  Tag.findOne({ _id: req.params.id })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
};


exports.delete = function(req, res){
  Tag.findOneAndDelete({ _id: req.params.id })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(500).json(error));
}