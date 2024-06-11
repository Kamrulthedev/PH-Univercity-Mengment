import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCouresService } from "./offeredCourse.service";

const createOfferedCourseDb = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await OfferedCouresService.createOfferedCourse(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create Offered Course Successfully !",
    data: result,
  });
});

const GetAllOfferedCourseDb = catchAsync(async (req, res, next) => {
  const result = await OfferedCouresService.GetAllOfferedCourse();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course received Successfully !",
    data: result,
  });
});

const GetSIngleOfferedCourseDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await OfferedCouresService.GetSIngleOfferedCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Offered Course received Successfully !",
    data: result,
  });
});

const UpadateOfferedCourseDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateDate = req.body;
  const result = await OfferedCouresService.UpadateOfferedCourse(id, updateDate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Offered Course Successfully !",
    data: result,
  });
});

export const OfferedCurseControllar = {
  createOfferedCourseDb,
  UpadateOfferedCourseDb,
  GetSIngleOfferedCourseDb,
  GetAllOfferedCourseDb,
};
