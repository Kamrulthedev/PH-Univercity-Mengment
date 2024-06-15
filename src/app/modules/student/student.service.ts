import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryFuilddrom";
import { studentSeachableFields } from "./consted";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('user')
      .populate("admissionSemester")
      .populate({
        path: "academicDepement",
        populate: {
          path: "academicFaculty",
        },
      }),
    query,
  )
    .search(studentSeachableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

//get a single students
const GetASingleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepement",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

//update-student
const updateStudent = async (id: string, paylaod: Partial<TStudent>) => {
  const { name, guardians, localGuardian, ...renauiningStudentData } = paylaod;

  const modifidIUpdateData: Record<string, unknown> = {
    ...renauiningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifidIUpdateData[`name.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifidIUpdateData[`localGuardian.${key}`] = value;
    }
  }

  if (guardians && Object.keys(guardians).length) {
    for (const [key, value] of Object.entries(guardians)) {
      modifidIUpdateData[`guardians.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifidIUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete student
const deleteStudentformDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      {
        idDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deleteStudent) {
      throw new AppError(404, "Falid to delete student");
    }

    const userId = deleteStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      {
        idDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deleteUser) {
      throw new AppError(404, "Falid to delete student");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err: any) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const StudentService = {
  getAllStudentsFromDB,
  GetASingleStudent,
  updateStudent,
  deleteStudentformDB,
};
