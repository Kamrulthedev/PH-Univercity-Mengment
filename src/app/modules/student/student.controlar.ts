import { StudentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

//gell all students
const getStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved successfully",
    data: result,
  });
});

//get a single student
const getASingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.GetASingleStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Single Student retrieved successfully",
    data: result,
  });
});

//update student
const updateStudentDb = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudent(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Update is Successfully!!",
    data: result,
  });
});

//delete a student
const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.deleteStudentformDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Deleted successfully",
    data: result,
  });
});

//export student Controllar
export const studentControllar = {
  getStudents,
  getASingleStudent,
  deleteStudent,
  updateStudentDb,
};
