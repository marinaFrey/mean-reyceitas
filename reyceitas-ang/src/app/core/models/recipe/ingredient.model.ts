import { Unit } from "./unit.model";

export interface Ingredient {
    _id: string;
    amount: number;
    unit: string; // id
    food: string; // id
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
