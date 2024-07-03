import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generatAdminId,
  generatFacultyId,
  generatStudentId,
} from "./user.utils";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDeperment } from "../academicDeperment/academicDeperment.model";
import { Faculty } from "../Faculty/faculty.model";
import { TAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";
import { SendImgToClodinary } from "../../utils/sendImgToCludinary";


const createStudent = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = "student";
  userData.email = studentData.email;

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  // Check if admission semester exists
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  // Generate student ID
  userData.id = await generatStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();


    //send Img cludinary
    SendImgToClodinary()


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

//crete Faculty
const createFaculty = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";
  //set faculty email
  userData.email = payload.email;

  const academicDepartment = await AcademicDeperment.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic Department not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generatFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    return newFaculty[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

//create admin
const createAdmin = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generatAdminId();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

//create me route
const getMe = async (userId: string, role: string) => {
  // const decoded = VerifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === "student") {
    result = await Student.findOne({ id: userId }).populate("user");
  }

  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }

  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }
  return result;
};

//cahange status update User
const ChangeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  ChangeStatus,
};
