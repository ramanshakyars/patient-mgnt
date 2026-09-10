import { Router } from "express";
import { login ,register} from "../controllers/auth.controller";


const route = Router();

route.post("/",login);
route.post("/register",register);