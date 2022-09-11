const AdminEmail = require('../models/AdminEmail');

exports.find = function(req, res){
  AdminEmail.find()
    .then(adminEmails => {
      res.json(adminEmails);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function(req, res){
  const newadminEmail = new AdminEmail({
    user: req.body.user,
    recipe: req.body.recipe,
  });

  newadminEmail
    .save()
    .then(adminEmail => {
      res.json(adminEmail);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

exports.delete = function (req, res) {
  AdminEmail.findOneAndDelete({ _id: req.params.id })
    .then(adminEmail => {
      res.json(adminEmail);
    })
    .catch(error => res.status(500).json(error));

}