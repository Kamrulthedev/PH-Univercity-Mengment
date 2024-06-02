import { Student } from "./student.model";


const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('');
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await Student.findById(id);
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
