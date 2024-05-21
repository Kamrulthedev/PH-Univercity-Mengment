import express from "express";
import { studentControllar } from "./student.controlar";

const router = express.Router();

router.post("/create-student", studentControllar.createStudent);
router.get("/", studentControllar.getStudents);
router.get("/:studentId", studentControllar.getASingleStudent);

router.delete("/:studentId", studentControllar.deleteStudent);

export const StudentRouts = router;
