import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";
import { NextFunction, Request, Response } from "express";

const createAcademincSemesterDb =catchAsync( async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademincSemester(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  })
});


//get all academi Semester data
const GetAllAcademicSemesterDb = async(req:Request, res:Response, next:NextFunction)=>{
  try{
    const result = await AcademicSemesterServices.GetAllAcademicSemester();
    res.status(200).json({
      success:true,
      message:"Gall All Academic Semester Successfully",
      data:result
    })
  } catch(err){
    next(err)
  }
};



export const AcademicSemestersControllars = {
    createAcademincSemesterDb,
    GetAllAcademicSemesterDb
};
