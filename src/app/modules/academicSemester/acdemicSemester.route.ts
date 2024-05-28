import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicSemestersControllars } from "./academicSemester.conrollar";
import { AcademicSemesterValidation } from "./acdemicSemester.validation";


const router = express.Router();
  router.post('/create-academic-semester',validationRequest(AcademicSemesterValidation.createAcademicSemestervalidationSchema), AcademicSemestersControllars.createAcademincSemesterDb)


export const AcademicSemesterRouts = router;