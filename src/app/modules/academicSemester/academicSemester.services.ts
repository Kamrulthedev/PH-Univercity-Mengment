import { academicSemesterNameCodeMapper } from "./academicSemester.constend";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademincSemester = async (payload: TAcademicSemester) => {
  //validation with semester name and semester code
 
 

  if(academicSemesterNameCodeMapper[payload.name] !==payload.code){
    throw new Error("Invalid Semester Code");
  }


  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademincSemester,
};
