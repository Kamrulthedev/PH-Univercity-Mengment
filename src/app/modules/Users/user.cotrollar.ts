import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudentDb = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudent(password, studentData);
    console.log(result)
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Student Create false",
      data: err,
    });
  }
};

export const UserControllar = {
  createStudentDb,
};
