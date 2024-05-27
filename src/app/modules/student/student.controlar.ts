import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentService } from "./student.service";

//catchAsync function
const catchAsync = (fun:RequestHandler) => {
  return (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch((err) => next(err));
  };
};

const getStudents = catchAsync(async (req, res, next) => {
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
});

const getASingleStudent: RequestHandler = async (req, res, next) => {
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

const deleteStudent: RequestHandler = async (req, res, next) => {
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
