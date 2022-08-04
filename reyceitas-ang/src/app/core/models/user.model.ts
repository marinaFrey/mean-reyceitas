export interface User {
    username: string;
    name: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    REGULAR,
    ADMINISTRATOR
}