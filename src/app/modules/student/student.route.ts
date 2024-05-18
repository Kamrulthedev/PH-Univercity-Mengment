import express from "express";
import { studentControllar } from "./student.controlar";


const router = express.Router()


router.post('/create-student', studentControllar.createStudent);

export const StudentRouts = router;


