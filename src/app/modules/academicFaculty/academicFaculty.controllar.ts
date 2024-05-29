import { Request, Response } from "express";
import { AcademicFacultyService } from "./academicFaulty.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createAcademicFultyDb = catchAsync(async(req:Request, res:Response) =>{
    const data = req.body;
    const result = await AcademicFacultyService.createAcademicFulty(data);
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true, 
        message:"Academic Faculty Created successfully",
        data:result
    })
});

export const AcademicFacultyCotrollar = {
    createAcademicFultyDb
};