import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";

const createAcademincSemesterDb =catchAsync( async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademincSemester(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  })
});

export const AcademicSemestersControllars = {
    createAcademincSemesterDb,
};
