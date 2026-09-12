import { PatientReqDto } from "../constants/patient.req.dto";
import { Role } from "../constants/role.enum";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export class PatientService {

    async registerPatient(payload: PatientReqDto) {
        const patient = await User.findOne({ email: payload.email });
        if (patient) {
            throw new Error("Patient Already exist");
        }
        
        let password = payload.password;
        if (password) {
            password = await bcrypt.hash(password, 13);
        }

        const newPatient = {
            ...payload,
            password,
            role: Role.PATIENT
        };

        const response = await User.create(newPatient)
        return response;
    }

    async getAllPatient(query: { page?: number, pageSize?: number, name?: string, phone?: number, email?: string }) {
        const { page = 1, pageSize = 10, name, phone, email } = query;
        
        const filter: any = { role: Role.PATIENT };
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (phone) filter.phone = phone; // Assuming exact match for phone number

        const skip = (page - 1) * pageSize;
        const patientList = await User.find(filter).skip(skip).limit(Number(pageSize));
        const total = await User.countDocuments(filter);

        if (!patientList) {
            throw new Error("No patient found")
        }
        return { data: patientList, total, page: Number(page), pageSize: Number(pageSize) }
    }

    async assignDoctorToPatient(patientId: string, doctorId: string) {
        const patient = await User.findById(patientId)
        if (!patient) {
            throw new Error("Patient not found")
        }
        const doctor = await User.findById(doctorId)
        if (!doctor) {
            throw new Error("Doctor not found")
        }
        const updatedPatient = await User.findByIdAndUpdate(patientId, { doctorAssigned: { name: doctor.name, id: doctor._id } }, { new: true });
        if (!updatedPatient) {
            throw new Error("Failed to update patient");
        }
        return updatedPatient;

    }

    async updatePatient(patientId: string, payload: PatientReqDto) {
        const patient = await User.findById(patientId)
        if (!patient) {
            throw new Error("Patient not found")
        }
        const updatedPatient = await User.findByIdAndUpdate(patientId, payload, { new: true });
        if (!updatedPatient) {
            throw new Error("Failed to update patient");
        }
        return updatedPatient;

    }

    async getPatientById(patientId: string) {
        const patient = await User.findById(patientId)
        if (!patient) {
            throw new Error("Patient not found")
        }
        return patient
    }

    async deletePatient(patientId: string) {
        const patient = await User.findById(patientId)
        if (!patient) {
            throw new Error("Patient not found")
        }
        const deletedPatient = await User.findByIdAndDelete(patientId);
        if (!deletedPatient) {
            throw new Error("Failed to delete patient");
        }
        return deletedPatient;

    }


}