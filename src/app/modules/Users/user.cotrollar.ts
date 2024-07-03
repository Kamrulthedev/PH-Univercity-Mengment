import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudentDb = catchAsync(async (req, res) => {
  console.log(req.file)
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudent(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully",
    data: result,
  });
});

//create faculty form Db
const createfacultyDb = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFaculty(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});

//create admin form Db
const createAdminDb = catchAsync(async (req, res) => {
  const { password, admin: amdinData } = req.body;
  const result = await UserServices.createAdmin(password, amdinData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

//create admin form Db
const getMeDb = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrived successfully",
    data: result,
  });
});

//change staus
const ChangeStatusDb = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.ChangeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrived successfully",
    data: result,
  });
});

export const UserControllar = {
  createStudentDb,
  createfacultyDb,
  createAdminDb,
  getMeDb,
  ChangeStatusDb
};
