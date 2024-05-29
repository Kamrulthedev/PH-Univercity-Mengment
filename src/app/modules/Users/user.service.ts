import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatStudentId } from "./user.utils";

const createStudent = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use as default password
  userData.password = password || (config.default_password as string);
  //set role
  userData.role = "student";

  //fin academic semester inif
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }
  //set menually a id
  userData.id = await generatStudentId(admissionSemester);
  //create a user
  const NewUser = await User.create(userData);
  if (Object.keys(NewUser).length) {
    //set id and _id as user
    //create a user
    (studentData.id = NewUser.id), (studentData.user = NewUser._id);
    const NewStudent = await Student.create(studentData);
    return NewStudent;
  }
};

export const UserServices = {
  createStudent,
};
