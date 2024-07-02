import express from "express";
import { studentControllar } from "./student.controlar";
import validationRequest from "../../milddlerwer/validate.Request";
import { studentvalidations } from "./student.validation";
import AuthValidated from "../../milddlerwer/auth.validated";
import { USER_ROLE } from "../users/user.conestant";

const router = express.Router();
router.get("/", studentControllar.getStudents);
router.get(
  "/:studentId",
  AuthValidated(USER_ROLE.admin, USER_ROLE.faculty),
  studentControllar.getASingleStudent
);
router.patch(
  "/:studentId",
  validationRequest(studentvalidations.updateStudentValidationSchema),
  studentControllar.updateStudentDb
);
router.delete("/:studentId", studentControllar.deleteStudent);

export const StudentRouts = router;
