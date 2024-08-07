import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";

const createAcademincSemesterDb = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademincSemester(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  });
});

//get all academi Semester data
const GetAllAcademicSemesterDb = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.GetAllAcademicSemester(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester fetch successfully!",
    data: result,
  });
});

//get a single academic semester data
const getASingleAcademicSemesterDb = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterServices.GetsingleAacadamic(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Single fetch Successfully",
    data: result,
  });
});

//update ACademic semester data
const UpdateAcademicSemesterDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AcademicSemesterServices.UpdateAcademicSemester(
    id,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Data Updated SUccessfully",
    data: result,
  });
});

export const AcademicSemestersControllars = {
  createAcademincSemesterDb,
  GetAllAcademicSemesterDb,
  getASingleAcademicSemesterDb,
  UpdateAcademicSemesterDb,
};
