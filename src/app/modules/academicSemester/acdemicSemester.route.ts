import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicSemestersControllars } from "./academicSemester.conrollar";
import { AcademicSemesterValidation } from "./acdemicSemester.validation";
import AuthValidated from "../../milddlerwer/auth.validated";

const router = express.Router();
//create a academic semester
router.post(
  "/create-academic-semester",
  validationRequest(
    AcademicSemesterValidation.createAcademicSemestervalidationSchema,
  ),
  AcademicSemestersControllars.createAcademincSemesterDb,
);

//get all Academic Semester
router.get("/", AuthValidated('admin'), AcademicSemestersControllars.GetAllAcademicSemesterDb);

//get all Academic Semester
router.get("/:id", AcademicSemestersControllars.getASingleAcademicSemesterDb);

//update Academic Semester
router.patch(
  "/:id",
  validationRequest(
    AcademicSemesterValidation.UpdateAcademicSemesterValidationschema,
  ),
  AcademicSemestersControllars.UpdateAcademicSemesterDb,
);

export const AcademicSemesterRouts = router;
