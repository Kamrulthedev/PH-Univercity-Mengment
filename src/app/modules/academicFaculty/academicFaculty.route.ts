import express  from "express";
import { AcademicFacultyCotrollar } from "./academicFaculty.controllar";


const router = express.Router()

router.post('/create-academic-faculty', AcademicFacultyCotrollar.createAcademicFultyDb)


export const AcademicFacultyRotes = router;