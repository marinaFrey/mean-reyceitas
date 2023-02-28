import { RecipeGroupAccess } from "@models/user/user-group.model";
import { Ingredient } from "./ingredient.model";
import { Instruction } from "./instruction.model";

export interface Recipe {
    _id: string;
    createdAt: string;
    createdBy: string;
    
    title: string;
    servings: number;
    isPublic?: boolean;

    ingredients?: Ingredient[];
    instructions?: Instruction[];
    pictures?: string[];

    notes?: string;
    tags?: Tag[];
    difficulty?: number;
    isFavorite?: boolean;
    groupAccess?: RecipeGroupAccess[];
}

export interface Tag {
    _id: string;
    name: string;
    color?: string;
}




