import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../constants/role.enum";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: Role
}

export const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.ADMIN }
})

export const User = mongoose.model<IUser>('User', UserSchema);