const Recipe = require('../models/Recipe');

// For the specialized search
const UserFavoriteRecipe = require('../models/UserFavoriteRecipe');
const UserGroup = require('../models/UserGroup');
const User= require('../models/User');

const recipeShort =  'title createdAt createdBy difficulty servings pictures tags'

//Parameters to add inside recipe: isFavorite, canEdit
exports.searchByName = function(req, res){
  //UserGroup.find().select('name').then(userGroups => {console.log(userGroups)})
  //Recipe.find().select('title isPublic createdBy').then(userGroups => {console.log(userGroups)})
  if(req.params.name)
    searchParameters = { title: {$regex: req.params.name, $options: 'i'}}
  else
    searchParameters = {};
  UserFavoriteRecipe.find({user: req.userId }).select('recipe')
  .then(userFavoriteRecipes => {
    var userFavoriteRecipesList = []
    userFavoriteRecipes.forEach(u => {userFavoriteRecipesList.push(u.recipe.toString())})

    Recipe.find({ $and:[ searchParameters, { $or: [ {'isPublic': true}, {'createdBy': req.userId }] } ]})
      .select(recipeShort)
      .populate('tags')
      .then(recipes => {
        var recipeList = []
        recipes.forEach(recipe => {
          const isFavorite = userFavoriteRecipesList?.includes(recipe._id.toString());
          recipeList.push({isFavorite, ...recipe._doc })
        })
        res.json(recipeList);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  })

}

exports.searchByTag = function(tag){
  if(tag)
    searchParameters = {tags: { $elemMatch: { $eq: tag} }}
  else
    searchParameters = {};

  Recipe.find(searchParameters)
    .select('title')
    .populate('tags')
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
}


exports.new = function(req, res){
//  console.log(req.body)
  const newRecipe = new Recipe({ 
    title: req.body.title,
    createdBy: req.userId,
    servings: req.body.servings,
    ingredients: req.body.ingredients, 
    difficulty: req.body.difficulty,
    isPublic: req.body.isPublic,
    pictures: req.body.pictures,
    tags: req.body.tags,
    instructions: req.body.instructions,
    notes: req.body.notes,
    groupAccess: req.body.groupAccess
  });

  newRecipe
    .save()
    .then(recipe => {
      editGroupRecipeAccessLevel(req.body.groupAccess,[],recipe._id)
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
}

const editGroupRecipeAccessLevel = async (newUserGroups, oldUserGroups, recipeId) => {
  // Put oldUserGroups in map
  // Put newUserGroups in map, checking which ones have changed -> toEdit
  var toEdit = [];
  var groupAccessMap = new Map(oldUserGroups.map((obj) => [obj.groupId, obj.accessLevel]))
  newUserGroups.map((obj) => {
    if(!groupAccessMap.has(obj.groupId) || groupAccessMap[obj.groupId] != obj.accessLevel){
      toEdit.push(obj)
    }
  })
  //console.log("to Edit ", toEdit)

  const promises = toEdit.map(async userGroupAccess => {
    const userGroup = await UserGroup.findById(userGroupAccess.group._id);
    if (!userGroup) { throw new Error(`UserGroup with id ${userGroupAccess.group_id} not found`); }
    //console.log("Found group", userGroup)
    userGroup.recipeAccess = userGroup.recipeAccess.filter(id => !id.recipeId.equals(recipeId));
    if(userGroupAccess.accessLevel != 0){
      //console.log("Adding recipe - group", userGroupAccess)
      userGroup.recipeAccess.push({"recipeId": recipeId, "accessLevel": userGroupAccess.accessLevel})
    }
    await userGroup.save();
    return userGroup;
  });
  await Promise.all(promises);
}
exports.edit = async function (req, res) {
 //check if user can edit and if it is owner
    const newData = { 
      title: req.body.title,
      servings: req.body.servings,
      ingredients: req.body.ingredients, 
      pictures: req.body.pictures,
      isPublic: req.body.isPublic,
      difficulty: req.body.difficulty,
      tags: req.body.tags,
      instructions: req.body.instructions,
      notes: req.body.notes,
      groupAccess: req.body.groupAccess
    };
    var recipe = await Recipe.findOne({_id: req.params.id}).populate('createdBy', 'firstName lastName profilePicture')
    if(recipe.createdBy && req.userId == recipe.createdBy.id){
      //var user = await User.findOne({_id: req.userId})
      editGroupRecipeAccessLevel(req.body.groupAccess, recipe.groupAccess, recipe._id);
    }
    recipe.cleanUploads(req.body.pictures)
    Object.assign(recipe,newData);
    recipe.save()
    .then(saved => {
      res.json(saved);
    })
    .catch(error => res.status(500).json(error));
}

exports.get = function (req, res) {
  Recipe.load(req.params.id)
    .then(recipe => {
      UserFavoriteRecipe.findOne({user: req.userId, recipe: req.params.id })
      .then(userFavoriteRecipe => {
        var isFavorite = userFavoriteRecipe ? true : false;
        if(recipe.createdBy && req.userId == recipe.createdBy.id){
          User.findOne({_id: req.userId}).populate('userGroups', 'name')
          .then(user=>{
            //recipe._doc.groupAccess = user.userGroups
            // Put original in a map
            var groupAccessMap = new Map(recipe._doc.groupAccess.map((obj) => [obj.group._id.toString(),{ 'accessLevel': obj.accessLevel, 'name': obj.group.name }]))
            // Put the new ones in the same map
            //console.log("group access map: ", groupAccessMap);
            
            user.userGroups.map((obj) => {
              if(obj && !groupAccessMap.has(obj._id.toString())){
                groupAccessMap.set(obj._id.toString(),{ 'accessLevel': 0, 'name' : obj.name });
              }
            })
            // Put the map in the doc

            recipe._doc.groupAccess = Array.from(groupAccessMap, ([key, value]) => ({
              ["group"]: { '_id': key, 'name': value.name }, "accessLevel": value.accessLevel
            }));
              //console.log("user groups: ", recipe._doc)
            res.json({isFavorite,  ...recipe._doc } );
          })
        } else {
          //Remove groupAccess?
          res.json({isFavorite, ...recipe._doc } );
        }
      })
    })
    .catch(error => {
      return res.status(500).json(error)
    });
}


exports.delete = function (req, res) {
  Recipe.delete(req.params.id)
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      return res.status(500).json(error)
    });
}