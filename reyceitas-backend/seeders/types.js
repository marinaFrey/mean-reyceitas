const mongoose = require("mongoose");
const InstructionType = require('../models/InstructionType');
const instructionTypes= [   
  new InstructionType({ name: "Cutting" }),
  new InstructionType({ name: "Peeling" }),
  new InstructionType({ name: "Seasoning" }),
  new InstructionType({ name: "Cooking" }),
  new InstructionType({ name: "Baking" }),
  new InstructionType({ name: "Boiling" }),
  new InstructionType({ name: "Soaking" }),
]
const UnitType = require('../models/UnitType');
const unitTypes= [   
  new UnitType({ name: "Unit" }),
  new UnitType({ name: "Volume" }),
  new UnitType({ name: "Weight" }),
]
const FoodType= require('../models/FoodType');
const foodTypes= [   
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
function saveSeeds(seeds){
    seeds.map(async (p, index) => {
        await p.save((err, result) => {
            //if(err) console.log("Mongo Seed Error: "+err)
            //if (index === seeds.length - 1) {
            // console.log("Seeded" + seeds.length + " "+ seeds[0]);
            //}
        });
    });
}
    
saveSeeds(instructionTypes);
saveSeeds(unitTypes);
saveSeeds(foodTypes);