import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistration = async (payoad:TSemesterRegistration) => {

//check if the semester is exist
const academicSemester = payoad?.academicSemester

if(academicSemester){
  const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)
};


  const result = await SemesterRegistration.create();
  return result;
};

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
