const fs = require('fs');
const Unit = require('../models/Unit');
const UnitStandard = require('../models/UnitStandard');
const Nutrient = require('../models/Nutrient');
const Food= require('../models/Food');

const { parse } = require('csv-parse');
const InstructionType = require('../models/InstructionType');
const UnitType = require('../models/UnitType');
const FoodType= require('../models/FoodType');

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

async function saveBasics(){
  var instructionTypes = await loadCsv("seeds/instructionTypes.csv");
  for(var i = 0; i < instructionTypes.length; i++) {
    const instructionType = new InstructionType({name: instructionTypes[i].name})
    await instructionType.save().catch((err) => {console.log(err)})
  }
  var unitTypes = await loadCsv("seeds/unitTypes.csv");
  for(var i = 0; i < unitTypes.length; i++) {
    const unitType = new UnitType({name: unitTypes[i].name})
    await unitType.save().catch((err) => {console.log(err)})
  }
  var units = await loadCsv("seeds/units.csv");
  for(var i = 0; i < units.length; i++) {
    const unitType = await UnitType.findOne({ name: units[i].unitTypeName }).exec()
    try {
      const unit = new Unit({name: units[i].name, abbreviation: units[i].abbreviation, unitType: unitType._id})
      await unit.save()
    } catch(error){ console.log(error) }
  }
  var unitStandards = await loadCsv("seeds/unitStandards.csv");
  for(var i = 0; i < unitStandards.length; i++) {
    const unitType = await UnitType.findOne({ name: unitStandards[i].unitType }).exec()
    const unit = await Unit.findOne({ name: unitStandards[i].standardUnit }).exec()
    try {
      const unitStandard = new UnitStandard({ unitType: unitType._id, standardUnit: unit._id})
      await unitStandard.save()
    } catch(error){ console.log(error) }
  }
  var nutrients = await loadCsv("seeds/nutrients.csv");
  for(var i = 0; i < nutrients.length; i++) {
    const unit = await Unit.findOne({ name: nutrients[i].unit}).exec()
    try {
      const nutrient = new Nutrient({ name: nutrients[i].name, defaultUnit: unit._id, type: nutrients[i].type})
      await nutrient.save()
    } catch(error){ console.log(error) }
  }
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

module.exports = saveBasics ;