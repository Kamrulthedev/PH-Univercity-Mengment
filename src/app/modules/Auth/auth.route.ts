import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AuthValidation } from "./auth.validation";
import { AuthControllars } from "./auth.controllar";
import { USER_ROLE } from "../users/user.conestant";
import AuthValidated from "../../milddlerwer/auth.validated";

const router = express.Router();

router.post(
  "/login",
  validationRequest(AuthValidation.loginValidatoinSchema),
  AuthControllars.loginUserDb,
);

router.post(
  "/change-password",
  AuthValidated(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValidation.changePasswordValidatoinSchema),
  AuthControllars.changePasswordDb,
);

router.post('/refresh-token', validationRequest(AuthValidation.refreshTokenValidationSchema), AuthControllars.refreshTokenDb);

//forget password
router.post('/forget-password', validationRequest(AuthValidation.forgetPasswordValidationSchema), AuthControllars.forgetPasswordDb);



export const AUthRouter = router;
