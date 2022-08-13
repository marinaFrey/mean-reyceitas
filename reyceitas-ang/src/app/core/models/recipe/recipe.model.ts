import { Ingredient } from "./ingredient.model";
import { Instruction } from "./instruction.model";

export interface Recipe {
    _id: string;
    createdAt: string;
    createdBy: string;
    
    title: string;
    servings: number;

    ingredients?: Ingredient[];
    instructions?: Instruction[];
    pictures?: string[];

    notes?: string;
    tags?: string[];
    difficulty?: number;
}





