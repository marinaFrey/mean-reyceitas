export interface Instruction {
    description: string;
    type: InstructionType;
    links?: string[];
    relatedRecipesId?: number[];
}

export enum InstructionType {
    Preparation,
    Cooking,
}
