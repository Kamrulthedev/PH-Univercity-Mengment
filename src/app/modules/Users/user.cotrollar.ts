import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudentDb = async (req: Request, res: Response, next:NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudent(password, studentData);
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

export const UserControllar = {
  createStudentDb,
};
