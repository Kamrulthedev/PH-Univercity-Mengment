import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/login", validationRequest(AuthValidation.loginValidatoinSchema));

export const AUthRouter = router;
