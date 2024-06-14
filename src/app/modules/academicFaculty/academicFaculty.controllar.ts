import { AcademicFacultyService } from "./academicFaulty.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicFultyDb = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await AcademicFacultyService.createAcademicFulty(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty Created successfully",
    data: result,
  });
});

const getAllAcademicFacultyDb = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAllAcademicFaculty();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty fetch successfully!",
    data: result,
  });
});

const getASingleAcademicFacultyDb = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getAcademicFacultyById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get A Single Academic Faculty successfully",
    data: result,
  });
});

const updateWithAcademicFacultyDb = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicFacultyService.updateWithAcademicFaculty(
    id,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty Updated Successfully",
    data: result,
  });
});

export const AcademicFacultyCotrollar = {
  createAcademicFultyDb,
  getAllAcademicFacultyDb,
  getASingleAcademicFacultyDb,
  updateWithAcademicFacultyDb,
};
