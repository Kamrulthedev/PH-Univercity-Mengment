import { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service";

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getASingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.GetASingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "A Single Student Get is Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentService.deleteStudentformDB(studentId);
    res.status(200).json({
      success: true,
      message: "Delete Student is Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllar = {
  getStudents,
  getASingleStudent,
  deleteStudent,
};
