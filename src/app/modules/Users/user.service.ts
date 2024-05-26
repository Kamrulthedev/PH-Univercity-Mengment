import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudent = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use as default password
  userData.password = password || (config.default_password as string);
  //set role
  userData.role = "student";
  //set menually a id
  userData.id = "2030100002";
  //create a user
  const NewUser = await User.create(userData);
  if(Object.keys(NewUser).length){
    //set id and _id as user
    studentData.id = NewUser.id,
    studentData.user = NewUser._id
    const NewStudent = await Student.create(studentData)
    return NewStudent
  };
};

export const UserService = {
  createStudent,
};


