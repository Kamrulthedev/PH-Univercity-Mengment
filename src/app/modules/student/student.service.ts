import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentInToDB = async (studentMData: Student) => {
  const student = new StudentModel(studentMData)
  const result = await student.save()
  // const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const GetASingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentInToDB,
  getAllStudentsFromDB,
  GetASingleStudent,
};
