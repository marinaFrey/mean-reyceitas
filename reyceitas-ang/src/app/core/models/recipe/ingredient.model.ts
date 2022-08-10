import { Unit } from "./unit.model";

export interface Ingredient {
    amount: number;
    unit?: Unit; 
    food?: Food; 
    unitId?: string; // id
    foodId?: string; // id
    details?: string;
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
