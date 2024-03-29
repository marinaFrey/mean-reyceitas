import { User } from "./user.model";

export interface UserGroup {
    _id: string;
    name: string;
    createdBy?: string;
    users?: User[];
    recipeWriteAccess?: boolean;
    groupWriteAccess?: boolean;
}

export interface RecipeGroupAccess {
    group: UserGroup;
    accessLevel: RecipeAccess;
    canView?: boolean;
    canEdit?: boolean;
}

export enum RecipeAccess {
    NO_ACCESS = 0,
    CAN_VIEW = 1,
    CAN_EDIT = 2,
}