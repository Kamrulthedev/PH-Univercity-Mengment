import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicSemestersControllars } from "./academicSemester.conrollar";
import { AcademicSemesterValidation } from "./acdemicSemester.validation";


const router = express.Router();
//create a academic semester
  router.post('/create-academic-semester',validationRequest(AcademicSemesterValidation.createAcademicSemestervalidationSchema), AcademicSemestersControllars.createAcademincSemesterDb)
  //get all Academic Semester
  router.get('/', AcademicSemestersControllars.GetAllAcademicSemesterDb)


export const AcademicSemesterRouts = router;