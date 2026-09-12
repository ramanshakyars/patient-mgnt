import { Role } from "./role.enum";

export interface PatientReqDto {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: number;
    address: string;
    password?: string;
    role: Role,
    doctorAssigned:{
        name:string,
        id:string
    }
}

export interface PatientResDto {
     name: string;
    age: number;
    gender: string;
    email: string;
    phone: number;
    address: string;
    role: Role,
    doctorAssigned:{
        name:string,
        id:string
    }
}
