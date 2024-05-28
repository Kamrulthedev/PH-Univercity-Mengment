import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicSemesterValidation } from "./acdemicSemester.validation";
import { AcademicSemestersControllars } from "./academicSemester.conrollar";


const router = express.Router();
  router.post('/create-academic-semester',validationRequest(AcademicSemesterValidation.createAcademicSemestervalidationSchema), AcademicSemestersControllars.createAcademincSemesterDb)


export const AcademicSemesterRouts = router;