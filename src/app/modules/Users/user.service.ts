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
  // Create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "student";

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  // Check if admission semester exists
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  userData.id = await generatStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check for existing student in the same academic department
    const existingStudent = await Student.findOne({
      academicDepement: studentData.academicDepement,
    }).session(session);

    // If a student with the same academic department already exists, throw an error
    if (existingStudent) {
      throw new AppError(
        httpStatus.CONFLICT,
        "A student with this academic department already exists"
      );
    }

    // Create a new user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // Set the id and user reference in studentData
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    // Create a new student
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};



export const UserServices = {
  createStudent,
};
