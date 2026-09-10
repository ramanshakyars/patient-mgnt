import { Role } from '../constants/role.enum'
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role
}

export interface LoginPayload {
    email: string,
    password: string
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    role: Role
}

