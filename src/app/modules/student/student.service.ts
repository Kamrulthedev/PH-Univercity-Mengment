import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentInToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({id});
  return result;
};

export const StudentService = {
  createStudentInToDB,
  getAllStudentsFromDB,
  GetASingleStudent,
};
