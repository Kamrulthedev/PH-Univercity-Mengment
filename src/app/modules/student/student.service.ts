import { Student } from "./student.model";


const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path:'academicDepement',
    populate:({
      path:"academicFaculty"
    })
  });
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester').populate({
    path:'academicDepement',
    populate:({
      path:"academicFaculty"
    })
  });
  return result;
};

const deleteStudentformDB = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  GetASingleStudent,
  deleteStudentformDB
};
