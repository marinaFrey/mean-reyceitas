const InstructionType = require('../models/InstructionType');
const instructionTypes = [   
  new InstructionType({ name: "Cutting" }),
  new InstructionType({ name: "Peeling" }),
  new InstructionType({ name: "Seasoning" }),
  new InstructionType({ name: "Cooking" }),
  new InstructionType({ name: "Baking" }),
  new InstructionType({ name: "Boiling" }),
  new InstructionType({ name: "Soaking" }),
]
const UnitType = require('../models/UnitType');
const unitTypes = [   
  new UnitType({ name: "Unit" }),
  new UnitType({ name: "Volume" }),
  new UnitType({ name: "Weight" }),
]
const FoodType= require('../models/FoodType');
const foodTypes = [   
  new FoodType({ name: "Baked Goods" }),
  new FoodType({ name: "Beef Prodcuts" }),
  new FoodType({ name: "Beverages" }),
  new FoodType({ name: "Cereals, Grains and Pasta" }),
  new FoodType({ name: "Dairy and Egg Products" }),
  new FoodType({ name: "Fats and Oils" }),
  new FoodType({ name: "Shellfish" }),
  new FoodType({ name: "Fruits and Fruits Juices" }),
  new FoodType({ name: "Lamb, Veal, and Game Products" }),
  new FoodType({ name: "Legumes and Legume Products" }),
  new FoodType({ name: "Nuts and Seed Products" }),
  new FoodType({ name: "Pork Products" }),
  new FoodType({ name: "Poultry Products" }),
  new FoodType({ name: "Sausages and Luncheon Meats" }),
  new FoodType({ name: "Snacks" }),
  new FoodType({ name: "Soups, Sauces and Gravies" }),
  new FoodType({ name: "Spices and Herbs" }),
  new FoodType({ name: "Sweets" }),
  new FoodType({ name: "Vegetables and Vegetable Products" }),
]
//Mongodb should be connected
async function saveSeeds(seeds){
  for(var i = 0; i < seeds.length; i++) {
    await seeds[i].save().catch((err) => {console.log(err)})
  }
  //await Promise.all(seeds.map(async (p)=> p.save((err, results) => {results})))
}
async function saveBasics(){
  await saveSeeds(instructionTypes);
  await saveSeeds(unitTypes);
  await saveSeeds(foodTypes);
  var unitType = await UnitType.findOne({ name: "Unit" })
  var volume = await UnitType.findOne({ name: "Volume" })
  var weight = await UnitType.findOne({ name: "Weight" })

  const Unit = require('../models/Unit');
  const units = [   
    new Unit({ name: "units" , abbreviation: " ", unitType: unitType}),
    new Unit({ name: "milligrams" , abbreviation: "mg", unitType: weight}),
    new Unit({ name: "grams" , abbreviation: "g", unitType: weight}),
    new Unit({ name: "kilograms" , abbreviation: "kg", unitType: weight}),
    new Unit({ name: "milliliters" , abbreviation: "ml", unitType: volume}),
    new Unit({ name: "liters" , abbreviation: "l", unitType: volume}),
    new Unit({ name: "cups" , abbreviation: "cup", unitType: volume}),
    new Unit({ name: "teaspoons" , abbreviation: "tsp", unitType: volume}),
    new Unit({ name: "tablespoons" , abbreviation: "tbsp", unitType: volume}),
  ]
  await saveSeeds(units)
  var unit = await Unit.findOne({ name: "units" })
  var pastas = await FoodType.findOne({ name: "Cereals, Grains and Pasta" })
  const Food= require('../models/Food');
  const foods = [   
    new Food({ name: "Macaroni", foodType: pastas }),
  ]
  await saveSeeds(foods)
  const User = require('../models/User');
  const users = [   
    new User({ email:"nicolassk@reyceitas.com", firstName: "Nicolas", lastName: "Kagami", source: "seeds"}),
  ]
  await saveSeeds(users)
  var user = await User.findOne({email: "nicolassk@reyceitas.com"})
  var macaroni = await Food.findOne({ name: "Macaroni" })
  var cooking = await InstructionType.findOne({ name: "Cooking" })
  var seasoning = await InstructionType.findOne({ name: "Seasoning" })
  const Recipe = require('../models/Recipe');

  const recipes = [   
  new Recipe({
      "title": "Massinha Miojo",
      "createdBy": user, 
      "servings": 1,
      "ingredients": [
        {
          "amount": 1,
          "unit": unit,
          "food": macaroni,
          "details": "Miojo"
        }
      ],
      "difficulty": 1,
      "instructions": [
        {
          "description": "Cozinhe a massa miojo",
          "instructionType": cooking,
        },
        {
          "description": "Adicione o pozinho maldito",
          "instructionType": seasoning
        }
      ],
    }),
  ]
  saveSeeds(recipes);
}



module.exports = saveBasics ;