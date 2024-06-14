import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyService } from "./faculty.service";

//get single faculty
const getSingleFacultyDb = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await FacultyService.getSingleFaculty(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved successfully",
    data: result,
  });
});

//get all faculty
const getAllFacutlyDb = catchAsync(async (req, res, next) => {
  const result = await FacultyService.getAllFacutly(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrived successfully",
    data: result,
  });
});

//update fauclty
const updateFacultyDb = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyService.updataFaculty(facultyId, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});

//delete faculty
const deletedFacultyDb = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await FacultyService.deleteFaculty(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is deleted successfully",
    data: result,
  });
});

export const FacultyControllar = {
  getSingleFacultyDb,
  getAllFacutlyDb,
  updateFacultyDb,
  deletedFacultyDb,
};
