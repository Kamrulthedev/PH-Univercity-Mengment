import express from "express";
import { UserControllar } from "./user.cotrollar";
import { studentvalidations } from "../student/student.validation";
import validationRequest from "../../milddlerwer/validate.Request";
import { FacultyValidationSchema } from "../Faculty/faculty.validation";
import { AdminValidationSchema } from "../Admin/admin.validation";
import AuthValidated from "../../milddlerwer/auth.validated";
import { USER_ROLE } from "./user.conestant";

const router = express.Router();

router.post(
  "/create-student",
  AuthValidated(USER_ROLE.admin),
  validationRequest(studentvalidations.createStudentValidationSchema),
  UserControllar.createStudentDb
);

router.post(
  "/create-faculty",
  AuthValidated(USER_ROLE.admin),
  validationRequest(FacultyValidationSchema.createFacultyValidationSchema),
  UserControllar.createfacultyDb
);

router.post(
  "/create-admin",
  // AuthValidated(USER_ROLE.admin),
  validationRequest(AdminValidationSchema.createAdminValidationSchema),
  UserControllar.createAdminDb
);

router.get(
  "/my",
  AuthValidated(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  UserControllar.getMeDb
);

export const UserRouotes = router;
