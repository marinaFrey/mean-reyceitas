import { Ingredient } from "./ingredient.model";
import { Instruction } from "./instruction.model";

export interface Recipe {
    _id: string;
    createdAt: string;
    createdBy: string;
    title: string;
    difficulty: number;
    servings: number;

    ingredients?: Ingredient[];
    instructions?: Instruction[];

    notes?: string;
}





