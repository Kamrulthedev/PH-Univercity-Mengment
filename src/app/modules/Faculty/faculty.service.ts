import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryFuilddrom";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { User } from "../users/user.model";

//get all faculty
const getAllFacutly = async (query: Record<string, unknown>) => {
  const facultQuery = new QueryBuilder(
    Faculty.find().populate("academicDepartment"),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultQuery.modelQuery;
  return result;
};
//get single faculty
const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate("academicDepartment");
  return result;
};

//faculty update
const updataFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete faculty
const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Faculty");
    }
    //get user _id
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(
      err.message || "An error occurred while deleting the faculty",
    );
  }
};

export const FacultyService = {
  getAllFacutly,
  getSingleFaculty,
  updataFaculty,
  deleteFaculty,
};
