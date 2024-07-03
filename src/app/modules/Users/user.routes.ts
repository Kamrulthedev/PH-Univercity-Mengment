import express, { NextFunction, Request, Response } from "express";
import { UserControllar } from "./user.cotrollar";
import { studentvalidations } from "../student/student.validation";
import validationRequest from "../../milddlerwer/validate.Request";
import { FacultyValidationSchema } from "../Faculty/faculty.validation";
import { AdminValidationSchema } from "../Admin/admin.validation";
import AuthValidated from "../../milddlerwer/auth.validated";
import { USER_ROLE } from "./user.conestant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImgToCludinary";

const router = express.Router();

router.post(
  "/create-student",
  AuthValidated(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
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
  "/me",
  AuthValidated(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  UserControllar.getMeDb
);

router.post(
  "/change-status/:id",
  AuthValidated("admin"),
  validationRequest(UserValidation.changeStatusValidationSchema),
  UserControllar.ChangeStatusDb
);

export const UserRouotes = router;
