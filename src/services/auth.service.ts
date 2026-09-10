import { LoginPayload, RegisterUser } from "../constants/user.enum";
import { User } from "../models/user.model";
import { generateToken, verifyToken } from "../config/jwt";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";
export class AuthService {


    async register(payload: RegisterUser) {
        const user = await User.findOne({ email: payload.email });
        if (user) {
            throw ("User Already exists")
        }
        const hashPassword = await bcrypt.hash(payload.password, 13);
        const newUser = new User({
            name: payload.name,
            email: payload.email,
            password: hashPassword,
            role: payload.role
        })
        const savedUser = await newUser.save();
        return savedUser;
    }
    async login(payload: LoginPayload) {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            throw new Error("User not found")
        }
        const comparePassword = await bcrypt.compare(payload.password, user?.password);
        if (!comparePassword) {
            throw new Error("Invalid credentioals")
        }
        const token = await generateToken(user);
        const response = {
            token: token,
            user: user
        }
        return response;
    }


}