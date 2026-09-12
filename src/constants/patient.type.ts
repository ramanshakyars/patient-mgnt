import { Role } from "./role.enum";

export interface PatientType {
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