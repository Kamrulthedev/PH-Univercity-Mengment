import express from "express";
import { FacultyControllar } from "./faculty.controllar";
import AuthValidated from "../../milddlerwer/auth.validated";

const router = express.Router();

router.patch("/:facultyId", FacultyControllar.updateFacultyDb);

router.get("/:facultyId", FacultyControllar.getSingleFacultyDb);

router.delete("/:facultyId", FacultyControllar.deletedFacultyDb);

router.get("/", AuthValidated(),FacultyControllar.getAllFacutlyDb);

export const FacultiesRoter = router;
