import express from "express";
import { UserControllar } from "./user.cotrollar";
import { studentvalidations } from "../student/student.validation";
import validationRequest from "../../milddlerwer/validate.Request";
import { FacultyValidationSchema } from "../Faculty/faculty.validation";

const router = express.Router();

router.post("/create-student",validationRequest(studentvalidations.createStudentValidationSchema),UserControllar.createStudentDb);

router.post('/create-faculty',validationRequest(FacultyValidationSchema.createFacultyValidationSchema), UserControllar.createfacultyDb)

export const UserRouotes = router;
