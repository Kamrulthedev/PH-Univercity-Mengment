import express, { NextFunction, Request, Response } from "express";
import { UserControllar } from "./user.cotrollar";


const router = express.Router();
router.post("/create-student", UserControllar.createStudentDb);

export const UserRouotes = router;
