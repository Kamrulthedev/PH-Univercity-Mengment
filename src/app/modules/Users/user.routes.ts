import express from "express";
import { UserControllar } from "./user.cotrollar";
import { studentvalidations } from "../student/student.validation";
import validationRequest from "../../milddlerwer/validate.Request";

const router = express.Router();

router.post("/create-student",validationRequest(studentvalidations.createStudentvalidationSchema),UserControllar.createStudentDb);

export const UserRouotes = router;
