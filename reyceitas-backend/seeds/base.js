const fs = require('fs');
const { parse } = require('csv-parse');

const Unit = require('../models/Unit');
const UnitStandard = require('../models/UnitStandard');
const Nutrient = require('../models/Nutrient');
const Food = require('../models/Food');
const InstructionType = require('../models/InstructionType');
const Tag = require('../models/Tag');
const UnitType = require('../models/UnitType');
const FoodType = require('../models/FoodType');
const Recipe = require('../models/Recipe');

async function loadCsv (filepath){
  csvData = [];
  await new Promise((resolve) => {
    fs.createReadStream(filepath)
      .pipe(parse({delimiter: ',', columns: true}))
      .on('data', function(csvrow) { csvData.push(csvrow) })
      .on('finish', () => { resolve(); });
  })
  return csvData;
}

async function loadInstructionTypes(){
  var instructionTypes = await loadCsv("seeds/instructionTypes.csv");
  for(var i = 0; i < instructionTypes.length; i++) {
    const instructionType = new InstructionType({name: instructionTypes[i].name})
    await instructionType.save().catch((err) => {console.log(err)})
  }
}
async function loadTags(){
  var tags = await loadCsv("seeds/tags.csv");
  for(var i = 0; i < tags.length; i++) {
    const tag = new Tag({name: tags[i].name})
    await tag.save().catch((err) => {console.log(err)})
  }
}

async function loadUnitTypes(){
  var unitTypes = await loadCsv("seeds/unitTypes.csv");
  for(var i = 0; i < unitTypes.length; i++) {
    const unitType = new UnitType({name: unitTypes[i].name})
    await unitType.save().catch((err) => {console.log(err)})
  }
}

async function loadUnits(){
  var units = await loadCsv("seeds/units.csv");
  for(var i = 0; i < units.length; i++) {
    const unitType = await UnitType.findOne({ name: units[i].unitTypeName }).exec()
    try {
      const unit = new Unit({name: units[i].name, abbreviation: units[i].abbreviation, unitType: unitType._id})
      await unit.save()
    } catch(error){ console.log(error) }
  }
}

async function loadUnitStandards(){
  var unitStandards = await loadCsv("seeds/unitStandards.csv");
  for(var i = 0; i < unitStandards.length; i++) {
    const unitType = await UnitType.findOne({ name: unitStandards[i].unitType }).exec()
    const unit = await Unit.findOne({ name: unitStandards[i].standardUnit }).exec()
    try {
      const unitStandard = new UnitStandard({ unitType: unitType._id, standardUnit: unit._id})
      await unitStandard.save()
    } catch(error){ console.log(error) }
  }
}

async function loadNutrients(){
  var nutrients = await loadCsv("seeds/nutrients.csv");
  for(var i = 0; i < nutrients.length; i++) {
    const unit = await Unit.findOne({ name: nutrients[i].unit}).exec()
    try {
      const nutrient = new Nutrient({ name: nutrients[i].name, defaultUnit: unit._id, type: nutrients[i].type})
      await nutrient.save()
    } catch(error){ console.log(error) }
  }
}
async function loadFoods(){
  var foods = await loadCsv("seeds/foods.csv");
  for(var i = 0; i < foods.length; i++) {
    const foodTypeName = foods[i]['Food Group'];
    var foodType = await FoodType.findOne({ name: foodTypeName }).exec()
    if(!foodType && foodTypeName != ""){
      const newfoodType = new FoodType({ name: foodTypeName })
      foodType = await newfoodType.save()
    }
    const density = parseFloat(foods[i]['Density']);
    if(foodType){
      try {
        var foodBody = { name: foods[i].name, foodType: foodType._id }
        if(density && typeof density === 'number'){
          foodBody.density = density;
        }
        foodBody.nutrients = [];
        for (var key in foods[i]){
          amount = parseFloat(foods[i][key]);
          if (amount && typeof amount == 'number'){
            const nutrient = await Nutrient.findOne({ name: key }).exec()
            if(nutrient){
              foodBody.nutrients.push({
                nutrient: nutrient._id,
                amount: foods[i][key]
              })
            }
          }
        }
        const food = new Food(foodBody)
        await food.save()
      } catch(error){ console.log(error) }
    }
  }
}
async function loadRecipes(){
  var fishTag = await Tag.findOne({ name: "Fish"}).exec();
  const grams = await Unit.findOne({ name: "grams" }).exec()
  var mainCourseTag = await Tag.findOne({ name: "Main Course"}).exec();
  var soupTag = await Tag.findOne({ name: "Soup"}).exec();
  var chickenTag = await Tag.findOne({ name: "Chicken"}).exec();
  var pastaTag = await Tag.findOne({ name: "Pasta"}).exec();
  var cooking = await InstructionType.findOne({ name: "Cooking"}).exec();
  var fishFood = await Food.findOne({ name: {$regex: "Fish"}}).exec();
  var chickenFood = await Food.findOne({ name: {$regex: "Chicken"}}).exec();
  try {
    var fishSoupRecipe = new Recipe({
      title: "Fish Soup",
      difficulty: 3,
      servings: 1,
      ingredients:  [{ amount: 100, unit: grams, food: fishFood, details: "Nicely seasoned" }],
      tags: [ fishTag, soupTag, mainCourseTag ],
      instructions: [{description: "Cook the fish", instructionType: cooking }]
    })
    await fishSoupRecipe.save()
  } catch(error){ console.log(error) }
  try {
    var chickenPastaRecipe = new Recipe({
      title: "Chicken Pasta",
      difficulty: 2,
      servings: 2,
      ingredients:  [{ amount: 100, unit: grams, food: chickenFood, details: "Nicely seasoned" }],
      tags: [ chickenTag, mainCourseTag, pastaTag],
      instructions: [{description: "Cook the chicken", instructionType: cooking }]
    })
    await chickenPastaRecipe.save()
  } catch(error){ console.log(error) }
}

async function loadSeedDb(){
  await loadInstructionTypes();
  console.log("Seeded Instruction Types");
  await loadUnitTypes();
  console.log("Seeded Unit Types");
  await loadTags();
  console.log("Seeded Tags");
  await loadUnits();
  console.log("Seeded Units");
  await loadUnitStandards();
  console.log("Seeded Unit Standards");
  await loadNutrients();
  console.log("Seeded Nutrients");
  await loadFoods();
  console.log("Seeded Foods");
  await loadRecipes();
  console.log("Seeded Recpes");
}

module.exports = loadSeedDb ;