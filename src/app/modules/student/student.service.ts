import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentInToDB = async (studentMData: TStudent) => {
  const student = new Student(studentMData); //create in instance

if(await student.isUserExists){
  throw new Error("User alrady Exists!")
};

  const result = await student.save();
  // const result = await StudentModel.create(student);
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

export const StudentService = {
  createStudentInToDB,
  getAllStudentsFromDB,
  GetASingleStudent,
};
