export interface User {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    token: string;
    role?: UserRole;
}

export enum UserRole {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}