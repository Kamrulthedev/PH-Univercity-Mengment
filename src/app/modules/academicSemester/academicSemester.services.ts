import { academicSemesterNameCodeMapper } from "./academicSemester.constend";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademincSemester = async (payload: TAcademicSemester) => {
  //validation with semester name and semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

//get all Academic Semester
const GetAllAcademicSemester = async () => {
  const result = await AcademicSemester.find()
  return result;
};

//get a single academic semester data
const GetsingleAacadamic = async (id:string)=>{
  const result = await AcademicSemester.findById(id)
  return result;
};


export const AcademicSemesterServices = {
  createAcademincSemester,
  GetAllAcademicSemester,
  GetsingleAacadamic
};
