export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
    lastVisited: string;
    token: string;
    role?: UserRole;
}

export enum UserRole {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}