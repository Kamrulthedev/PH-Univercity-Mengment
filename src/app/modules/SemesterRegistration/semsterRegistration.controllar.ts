import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

//create Semester Regitration
const createSemesterRegistrationDb = catchAsync(async (req, res, next) => {
  const result = await SemesterRegistrationService.createSemesterRegistration(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration created Seuccssfully",
    data: result,
  });
});

//get all Semester Registration
const getAllSemesterRegistrationDb = catchAsync(async (req, res, next) => {
  const result = await SemesterRegistrationService.getAllSemesterRegistration(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration received successfully",
    data: result,
  });
});

//get single Semester Registration
const getSingleSemesterRegistationDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistation(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration Sigle recrived Successfully",
    data: result,
  });
});

//update Semester Registration
const updateSemesterRegistaionDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await SemesterRegistrationService.updateSemesterRegistaion(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration updated Successfully",
    data: result,
  });
});

export const SemesterRegistrationControllar = {
  createSemesterRegistrationDb,
  getSingleSemesterRegistationDb,
  getAllSemesterRegistrationDb,
  updateSemesterRegistaionDb,
};
