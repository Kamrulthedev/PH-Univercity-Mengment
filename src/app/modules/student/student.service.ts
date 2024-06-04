import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

  const queryObj = { ...query };

  let searchTerm = "";

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //Filtering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

  excludeFields.forEach((eL) => delete queryObj[eL]);
  console.log({query}, {queryObj});
  
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepement",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
    skip = (page - 1) * limit;
  }

  if (query.page) {
    page = Number(query.page);
  }

  const paginaateQuery = sortQuery.skip(skip);

  const limitQuery = paginaateQuery.limit(limit);

  //fild limiting
  let fields = '-__v'

  if(query.fields){
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

//get a single students
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

  const result = await Student.findOneAndUpdate({ id }, modifidIUpdateData, {
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
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      {
        idDeleted: true,
      },
      {
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
      },
      {
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
