import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatFacultyId, generatStudentId } from "./user.utils";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDeperment } from "../academicDeperment/academicDeperment.model";
import { Faculty } from "../Faculty/faculty.model";


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

  // Generate student ID
  userData.id = await generatStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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
const createFaculty = async(password :string, payload :TFaculty)=>{
  const userData :Partial<TUser> = {};
  
  userData.password = password || config.default_password as string
  
  userData.role = 'faculty';

  const academicDepartment = await AcademicDeperment.findById(
    payload.academicDepartment,
  );
  if(!academicDepartment){
    throw new AppError(400, 'Academic Deperrment not found');
  }

  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    userData.id = await generatFacultyId();

    const newUser = await User.create([userData], {session});

    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user =newUser[0]._id

    const newFaculty = await Faculty.create([payload], {
      session
    });
    if(!newFaculty.length){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  }catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
  }
}

export const UserServices = {
  createStudent,
  createFaculty
};
