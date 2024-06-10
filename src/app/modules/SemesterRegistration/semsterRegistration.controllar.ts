import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistrationDb = catchAsync(async (req, res, next) => {
  const result = await SemesterRegistrationService.createSemesterRegistration(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration Seuccssfully",
    data: result,
  });
});

const getAllSemesterRegistrationDb = catchAsync(async (req, res, next) => {
  const result = await SemesterRegistrationService.getAllSemesterRegistration();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration received successfully",
    data: result,
  });
});

const getSingleSemesterRegistationDb = catchAsync(async (req, res, next) => {
    const {id} = req.params;
  const result = await SemesterRegistrationService.getSingleSemesterRegistation(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration recrived Successfully",
    data: result,
  });
});

const updateSemesterRegistaionDb = catchAsync(async(req, res, next)=>{
   const result = await SemesterRegistrationService.updateSemesterRegistaion();
   sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message:"Semester Registration Single recrived Successfully",
    data:result
   })
});

export const SemesterRegistrationControllar = {
  createSemesterRegistrationDb,
  getSingleSemesterRegistationDb,
  getAllSemesterRegistrationDb,
  updateSemesterRegistaionDb
};
