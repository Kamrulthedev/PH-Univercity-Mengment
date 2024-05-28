import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";
import { NextFunction, Request, Response } from "express";

const createAcademincSemesterDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AcademicSemesterServices.createAcademincSemester(
      req.body
    );
   res.status(200).json({
      success: true,
      message: "Academic Semester Created Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Academic Semester not create in database!! ERROOR",
      data: err,
    })
  }
};

export const AcademicSemestersControllars = {
  createAcademincSemesterDb,
};
