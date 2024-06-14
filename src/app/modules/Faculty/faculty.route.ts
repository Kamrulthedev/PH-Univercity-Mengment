import express from "express";
import { FacultyControllar } from "./faculty.controllar";

const router = express.Router();

router.patch("/:facultyId", FacultyControllar.updateFacultyDb);

router.get("/:facultyId", FacultyControllar.getSingleFacultyDb);

router.delete("/:facultyId", FacultyControllar.deletedFacultyDb);

router.get("/", FacultyControllar.getAllFacutlyDb);

export const FacultiesRoter = router;
