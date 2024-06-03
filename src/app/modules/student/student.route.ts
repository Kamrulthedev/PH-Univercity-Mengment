import express from "express";
import { studentControllar } from "./student.controlar";

const router = express.Router();
router.get("/", studentControllar.getStudents);
router.get("/:studentId", studentControllar.getASingleStudent);
router.patch('/:studentId', studentControllar.updateStudentDb)
router.delete("/:studentId", studentControllar.deleteStudent);

export const StudentRouts = router;
