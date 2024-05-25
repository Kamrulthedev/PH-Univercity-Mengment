import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentInToDB = async (studentMData: TStudent) => {
  const student = new Student(studentMData); 
  const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentformDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

export const StudentService = {
  createStudentInToDB,
  getAllStudentsFromDB,
  GetASingleStudent,
  deleteStudentformDB,
};
