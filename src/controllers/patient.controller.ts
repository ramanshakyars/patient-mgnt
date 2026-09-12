import { PatientService } from "../services/patient.service";
import { NextFunction, Request, Response } from "express";


const patientService = new PatientService()


export const registerPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await patientService.registerPatient(req.body)
        res.status(201).json({ success: true, message: "Patient registered successfully", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllPatientList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined,
            name: req.query.name as string,
            phone: req.query.phone ? parseInt(req.query.phone as string) : undefined,
            email: req.query.email as string
        };
        const response = await patientService.getAllPatient(query)
        res.status(200).json({ success: true, message: "Patient list", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getAssignedDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const doctorId = req.params.doctorId;
        const response = await patientService.assignDoctorToPatient(patientId, doctorId)
        res.status(200).json({ success: true, message: "Assigned doctor", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const payload = req.body;
        const response = await patientService.updatePatient(patientId, payload)
        res.status(200).json({ success: true, message: "Patient updated successfully", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const response = await patientService.getPatientById(patientId)
        res.status(200).json({ success: true, message: "Patient", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const response = await patientService.deletePatient(patientId)
        res.status(200).json({ success: true, message: "Patient deleted successfully", data: response })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}