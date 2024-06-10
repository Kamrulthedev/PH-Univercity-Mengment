import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

//create Semester Registration
const createSemesterRegistration = async (payoad: TSemesterRegistration) => {
  //find academic semester in the database
  const academicSemester = payoad?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  const isAcademicSemesterRegistrationExists =
    await SemesterRegistration.findOne({
      academicSemester,
    });

  //check if the semester is exist
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Academic Semester!");
  }

  //check if the semester is already registered !
  if (isAcademicSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "Academic Semeter aleady exsits!");
  };

  const result = await SemesterRegistration.create(payoad);
  return result;
};

//get all Semester Registration
const getAllSemesterRegistration = async () => {
  const result = SemesterRegistration.find();
  return result;
};

const getSingleSemesterRegistation = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistaion = async () => {
  const result = await SemesterRegistration.findByIdAndUpdate();
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  updateSemesterRegistaion,
  getAllSemesterRegistration,
  getSingleSemesterRegistation,
};
