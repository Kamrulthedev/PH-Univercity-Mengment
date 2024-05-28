import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";
import { NextFunction, Request, Response } from "express";

const createAcademincSemesterDb = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademincSemester(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  });
});

//get all academi Semester data
const GetAllAcademicSemesterDb = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.GetAllAcademicSemester();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester fetch successfully!",
    data: result,
  });
});

//get a single academic semester data
const getASingleAcademicSemesterDb = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await AcademicSemesterServices.GetsingleAacadamic(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Single fetch Successfully",
    data: result,
  });
});

export const AcademicSemestersControllars = {
  createAcademincSemesterDb,
  GetAllAcademicSemesterDb,
  getASingleAcademicSemesterDb
};
