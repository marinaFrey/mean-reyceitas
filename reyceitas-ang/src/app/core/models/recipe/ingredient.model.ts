import { Unit } from "./unit.model";

export interface Ingredient {
    _id: string;
    unit: Unit;
    food: Food;
    details: string;
}

export interface Food {
    _id: string;
    name: string;
    foodGroup: FoodGroup;
}

export interface FoodGroup {
    name: string;
    icon: string;
}
