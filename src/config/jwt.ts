import jwt from 'jsonwebtoken';
import { IUser } from '../constants/user.enum';

const jwtSecret = process.env.JWT_SECRET as string

export const generateToken = (user:IUser)=>{
    return jwt.sign(user,jwtSecret,{expiresIn:'1d'})
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token,jwtSecret)
}
