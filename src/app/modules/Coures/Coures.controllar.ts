import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CouresService } from "./Coures.service";

const createCouresDb = catchAsync(async (req, res, next) => {
  const couresData = req.body;
  const result = await CouresService.createCoures(couresData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coures created successfully",
    data: result,
  });
});

const getAllCouresDb = catchAsync(async (req, res, next) => {
  const result = await CouresService.getAllCoures(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coures Reitrive is successfully",
    data: result,
  });
});

const getSingleCouresDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CouresService.getSingleCoures(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Coures Reitrive is successfully",
    data: result,
  });
});

const updateCorseDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CouresService.updateCorse(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Update Successfully !",
    data: result,
  });
});

const deleteCouresDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CouresService.deleteCoures(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coures Delete is successfully",
    data: result,
  });
});

const assignFacultiseWithCourseDb = catchAsync(async (req, res, next) =>{
  const { courseId } = req.params;
  const {faculties} = req.body;
  const result = await CouresService.assignFacultiseWithCourse(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fculty Assign is successfully !",
    data: result,
  });
});

export const CouresControllar = {
  createCouresDb,
  getAllCouresDb,
  getSingleCouresDb,
  updateCorseDb,
  deleteCouresDb,
  assignFacultiseWithCourseDb
};
