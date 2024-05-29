import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFulty = async(payload: TAcademicFaculty)=>{
   const result = await AcademicFaculty.create(payload)
   return result;
};




export const AcademicFacultyService = {
createAcademicFulty
};