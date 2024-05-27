import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";



//gell all students
const getStudents = catchAsync(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "Student are retrieved Successfully",
    data: result,
  });
});

//get a single student
const getASingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentService.GetASingleStudent(studentId);
  res.status(200).json({
    success: true,
    message: "A Single Student Get is Successfully",
    data: result,
  });
});

//delete a student
const deleteStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await StudentService.deleteStudentformDB(studentId);
  res.status(200).json({
    success: true,
    message: "Delete Student is Successfully",
    data: result,
  });
});

//export student Controllar
export const studentControllar = {
  getStudents,
  getASingleStudent,
  deleteStudent,
};
