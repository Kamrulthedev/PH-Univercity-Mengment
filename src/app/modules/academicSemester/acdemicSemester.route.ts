import express from "express";
import { AcademicSemestersControllars } from "./academicSEmester.conrollar";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicSemesterValidation } from "./acdemicSemester.validation";


const router = express.Router();
  router.post('/create-academic-semester',validationRequest(AcademicSemesterValidation.createAcademicSemestervalidationSchema), AcademicSemestersControllars.createAcademincSemesterDb)


export const AcademicSemesterRouts = router;