import { Router } from "express";
import { deletePatient, getAllPatientList, getPatientById, registerPatient, updatePatient } from "../controllers/patient.controller";
import { authenticate, isAdmin } from "../middleware/jwt.util";

const route = Router()

route.get("/", getAllPatientList);
route.post("/register", authenticate, isAdmin, registerPatient);
route.put("/update/:id", authenticate, isAdmin, updatePatient);
route.get("/:id", getPatientById);
route.delete("/:id", authenticate, isAdmin, deletePatient);

export default route;