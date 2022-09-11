export interface UserGroup {
    _id: string;
    name: string;
    createdBy: string;
    recipeWriteAccess: boolean;
    groupWriteAccess: boolean;
}

export interface RecipeGroupAccess {
    _id: string;
    name: string;
    access: RecipeAccess;
    canView?: boolean;
    canEdit?: boolean;
}

export enum RecipeAccess {
    NO_ACCESS = 0,
    CAN_VIEW = 1,
    CAN_EDIT = 2,
}