import express from "express";
import { studentControllar } from "./student.controlar";
import validationRequest from "../../milddlerwer/validate.Request";
import { studentvalidations } from "./student.validation";

const router = express.Router();
router.get("/", studentControllar.getStudents);
router.get("/:studentId", studentControllar.getASingleStudent);
router.patch(
  "/:studentId",
  validationRequest(studentvalidations.updateStudentValidationSchema),
  studentControllar.updateStudentDb,
);
router.delete("/:studentId", studentControllar.deleteStudent);

export const StudentRouts = router;
