import express from "express";
import { AcademicFacultyCotrollar } from "./academicFaculty.controllar";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();
//create a academic faculty
router.post(
  "/create-academic-faculty",validationRequest(AcademicFacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyCotrollar.createAcademicFultyDb
);
//get all cademic faculty
router.get("/", AcademicFacultyCotrollar.getAllAcademicFacultyDb);
//get a single faculty
router.get("/:id",AcademicFacultyCotrollar.getASingleAcademicFacultyDb);

//update data 
router.patch('/:id', validationRequest(AcademicFacultyValidation.updateWithAcademicFacultyvalidation), AcademicFacultyCotrollar.updateWithAcademicFacultyDb)

export const AcademicFacultyRotes = router;
