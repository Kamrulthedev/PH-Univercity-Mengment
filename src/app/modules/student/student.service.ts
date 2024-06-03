import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepement",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepement",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudent = async (id: string, paylaod: Partial<TStudent>) => {

  const { name, guardians, localGuardian, ...renauiningStudentData } = paylaod;

  const modifidIUpdateData : Record<string, unknown> = {
    ...renauiningStudentData
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifidIUpdateData[`name.${key}`] = value;
    }
  };

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifidIUpdateData[`localGuardian.${key}`] = value;
    }
  };

  if(guardians && Object.keys(guardians).length){
    for(const [key, value] of Object.entries(guardians)){
      modifidIUpdateData[`guardians.${key}`] = value;
    }
  };
  

  console.log(modifidIUpdateData)

  const result = await Student.findOneAndUpdate({ id }, modifidIUpdateData, { new: true, runValidators:true });
  return result;
};

//delete student
const deleteStudentformDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      {
        idDeleted: true,
        new: true,
        session,
      }
    );
    if (!deleteStudent) {
      throw new AppError(404, "Falid to delete student");
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      {
        idDeleted: true,
        new: true,
        session,
      }
    );
    if (!deleteUser) {
      throw new AppError(404, "Falid to delete student");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentService = {
  getAllStudentsFromDB,
  GetASingleStudent,
  updateStudent,
  deleteStudentformDB,
};
