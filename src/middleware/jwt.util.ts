import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtHeader } from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
   const authheader = req.headers.authorization;
   if(!authheader){
    throw new Error("Unauthorized")

   }

   const token = authheader.split("")[1];
   const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
   req.user = decoded;
   next();
}