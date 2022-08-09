import { Unit } from "./unit.model";

export interface Ingredient {
    amount: number;
    unit: string; // id
    food: string; // id
    details: string;
}

export interface Food {
    _id: string;
    name: string;
    foodType: FoodType;
}

export interface FoodType{
    name: string;
    icon: string;
}
