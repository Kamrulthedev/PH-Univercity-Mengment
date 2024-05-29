import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFulty = async(payload: TAcademicFaculty)=>{
   const result = await AcademicFaculty.create(payload)
   return result;
};

const getAllAcademicFaculty = async()=>{
    const result = await AcademicFaculty.find();
    return result;
};

const getAcademicFacultyById = async(id:string) =>{
    const result = await AcademicFaculty.findById(id);
    return result;
};



export const AcademicFacultyService = {
createAcademicFulty,
getAllAcademicFaculty,
getAcademicFacultyById
};