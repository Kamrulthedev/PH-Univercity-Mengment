import express from "express";
import { UserControllar } from "./user.cotrollar";
import { studentvalidations } from "../student/student.validation";
import validationRequest from "../../milddlerwer/validate.Request";

const router = express.Router();

router.post("/create-student",validationRequest(studentvalidations.createStudentValidationSchema),UserControllar.createStudentDb);

router.post('/create-faculty', UserControllar.createfacultyDb)

export const UserRouotes = router;
