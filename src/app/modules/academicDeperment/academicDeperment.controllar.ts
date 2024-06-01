import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepermentService } from "./academicDepermant.services";

const createAcademicDerpermentDb = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await AcademicDepermentService.createAcademicDerperment(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Deperment Created successfully",
    data: result,
  });
});

const getAllACademicDeperment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepermentService.GetallAcademicDeperment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Deperment get successfully",
    data: result,
  });
});

const getSingleAcademicDeperment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await AcademicDepermentService.getSingleAcademicDeperment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Deperment is retrived successfully",
    data: result,
  });
});

const updateAcademicDeperment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicDepermentService.updateAcademicDeperment(id, updateData);
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message:"Academic Deperment is Updated successfully",
    data:result
  })
});

export const AcademicDepermantControllar = {
  createAcademicDerpermentDb,
  getAllACademicDeperment,
  getSingleAcademicDeperment,
  updateAcademicDeperment
};
