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
  const result = await Student.findOneAndUpdate({ id }, paylaod, { new: true });
  return result;
};

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

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentService = {
  getAllStudentsFromDB,
  GetASingleStudent,
  updateStudent,
  deleteStudentformDB,
};
