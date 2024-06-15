import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AuthValidation } from "./auth.validation";
import { AuthControllars } from "./auth.controllar";

const router = express.Router();

router.post(
  "/login",
  validationRequest(AuthValidation.loginValidatoinSchema),
  AuthControllars.loginUserDb,
);

router.put(
  "/login",
  validationRequest(AuthValidation.loginValidatoinSchema),
  AuthControllars.loginUserDb,
);

export const AUthRouter = router;
