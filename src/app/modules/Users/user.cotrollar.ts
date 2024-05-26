import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudentDb = async (req: Request, res: Response, next:NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudent(password, studentData);
    sendResponse(res, {
      statusCode:httpStatus.OK,
      success:true,
      message:"Student Created Successfully",
      data:result
    })
  } catch (err) {
   next(err)
  }
};

export const UserControllar = {
  createStudentDb,
};
