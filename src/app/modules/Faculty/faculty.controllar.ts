import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyService } from "./faculty.service";



const getSingleFacultyDb = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message:"Faculty is retrieved successfully",
    data:result
  })
});


const getAllFacutlyDb = catchAsync(async(req, res, next)=>{
    const result = await FacultyService.getAllFacutly(req.query);
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculties are retrived successfully",
        data:result
    })
});


export const FacultyControllar = {
    getSingleFacultyDb,
    getAllFacutlyDb
};

