import express from "express";
import { FacultyControllar } from "./faculty.controllar";
import AuthValidated from "../../milddlerwer/auth.validated";
import { USER_ROLE } from "../users/user.conestant";

const router = express.Router();

router.patch("/:facultyId", FacultyControllar.updateFacultyDb);

router.get("/:facultyId", FacultyControllar.getSingleFacultyDb);

router.delete("/:facultyId", FacultyControllar.deletedFacultyDb);

router.get("/", AuthValidated(USER_ROLE.admin, USER_ROLE.faculty),FacultyControllar.getAllFacutlyDb);

export const FacultiesRoter = router;
