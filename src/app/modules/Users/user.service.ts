import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatStudentId } from "./user.utils";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

const createStudent = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use as default password
  userData.password = password || (config.default_password as string);
  //set role
  userData.role = "student";

  //create isolated environmenet
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //fin academic semester inif
    const admissionSemester = await AcademicSemester.findById(
      studentData.admissionSemester
    );
    if (!admissionSemester) {
      throw new Error("Admission semester not found");
    }
    //set menually a id
    userData.id = await generatStudentId(admissionSemester);
    //create a user(transaction-1)
    const NewUser = await User.create([userData], { session });
    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create user !!");
    }
    //set id, _id as user
    studentData.id = NewUser[0].id;
    studentData.user = NewUser[0]._id;
    //create a student (tracsaction-2)
    const NewStudent = await Student.create([studentData], { session });
    if (!NewStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Falied to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return NewStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudent,
};
