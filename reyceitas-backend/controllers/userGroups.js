const UserGroup = require('../models/UserGroup');
const User = require('../models/User');

exports.find = function (req, res) {
  UserGroup.find()
    .then(userGroups => {
      res.json(userGroups);
    })
    .catch(error => res.status(500).json(error));
}

exports.new = function (req, res) {
  const newUserGroup = new UserGroup({
    name: req.body.name,
    users: req.body.users,
    recipeWriteAccess: req.body.recipeWriteAccess,
    groupWriteAccess: req.body.groupWriteAccess,
  });

  newUserGroup
    .save()
    .then(userGroup => {
    addUsersToGroup(userGroup.users, userGroup._id); 
      res.json(userGroup);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}
const removeUsersFromGroup = async (userIds, userGroupId) => {
  const promises = userIds.map(async userId => {
    const user = await User.findById(userId);
    if (!user) { throw new Error(`User with id ${userId} not found`); }
    user.userGroups = user.userGroups.filter(id => !id.equals(userGroupId));
    await user.save();
    return user;
  });
  await Promise.all(promises);
}
const addUsersToGroup = async (userIds, userGroupId) => {
  const promises = userIds.map(async userId => {
    const user = await User.findById(userId);
    if (!user) { throw new Error(`User with id ${userId} not found`); }
    user.userGroups.push(userGroupId);
    await user.save();
    return user;
  });
  await Promise.all(promises);
}

exports.edit = function (req, res) {
  const newData = { 
    name: req.body.name,
    users: req.body.users,
    recipeWriteAccess: req.body.recipeWriteAccess,
    groupWriteAccess: req.body.groupWriteAccess,
  };
    return UserGroup.findOne({_id: req.params.id })
    .then(userGroup => {
      var oldUsers = userGroup.users.map(function(e) { return e.toString(); });
      removeUsersFromGroup(oldUsers.filter( function( el ) { return newData.users.indexOf( el ) < 0; }), userGroup._id); 
      addUsersToGroup(newData.users.filter( function( el ) { return oldUsers.indexOf( el ) < 0; }), userGroup._id); 
      userGroup.overwrite(newData).save()
      .then(userGroup => {
        res.json(userGroup);
      })})
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