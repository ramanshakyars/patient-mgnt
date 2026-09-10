import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";



const authService = new AuthService();

export const register = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = authService.register(req.body);
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(400).json({ success: false, data: err })
    }


}

export const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = authService.login(req.body);
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(400).json({ success: false, data: err })
    }

}