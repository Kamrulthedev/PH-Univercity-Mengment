import { Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;
    const result = UserService.createStudent(password, student);
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
  createStudent,
};
