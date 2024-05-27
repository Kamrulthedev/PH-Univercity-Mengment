import express, { NextFunction, Request, Response } from "express";
import { UserControllar } from "./user.cotrollar";
import { AnyZodObject } from "zod";
import { studentvalidations } from "../student/student.validation";

const router = express.Router();

const validateZod = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
     await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  "/create-student",
  validateZod(studentvalidations.studentvalidationSchema),
  UserControllar.createStudentDb
);

export const UserRouotes = router;
