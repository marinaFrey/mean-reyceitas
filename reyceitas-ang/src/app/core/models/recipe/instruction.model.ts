export interface Instruction {
    description: string;
    type: InstructionType;
    relatedRecipesId?: number[];
}

export enum InstructionType {
    Preparation,
    Cooking,
}
