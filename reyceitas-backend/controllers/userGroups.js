const UserGroup = require('../models/UserGroup');

exports.find = function (req, res) {
  UserGroup.find()
    .then(userGroups => {
      res.json(userGroups);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function (req, res) {
  const newuserGroup = new UserGroup({
    name: req.body.name,
    users: req.body.users,
  });

  newuserGroup
    .save()
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.edit = function (req, res) {
  const newData = { 
    name: req.body.name,
    users: req.body.users,
  };

  UserGroup.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function (req, res) {
  UserGroup.findOne({ _id: req.params.id })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
}


exports.delete = function (req, res) {
  UserGroup.findOneAndDelete({ _id: req.params.id })
    .then(userGroup => {
      res.json(userGroup);
    })
    .catch(error => res.status(500).json(error));
}