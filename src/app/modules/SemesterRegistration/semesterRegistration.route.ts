import express from "express";
import { SemesterRegistrationControllar } from "./semsterRegistration.controllar";
import validationRequest from "../../milddlerwer/validate.Request";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester",
  validationRequest(
    SemesterRegistrationValidation.createsemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllar.createSemesterRegistrationDb
);

router.get("/", SemesterRegistrationControllar.getAllSemesterRegistrationDb);

router.get(
  "/:id",
  SemesterRegistrationControllar.getSingleSemesterRegistationDb
);

router.patch(
  "/:id",
  validationRequest(
    SemesterRegistrationValidation.updatesemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllar.updateSemesterRegistaionDb
);

export const SemesterRegistrationRouter = router;
