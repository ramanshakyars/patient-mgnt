import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtHeader } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
   const authheader = req.headers.authorization;
   if(!authheader){
    return res.status(401).json({ success: false, message: "Unauthorized" });
   }

   try {
       const token = authheader.split(" ")[1];
       const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
       req.user = decoded;
       next();
   } catch (error) {
       return res.status(401).json({ success: false, message: "Invalid token" });
   }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }
}