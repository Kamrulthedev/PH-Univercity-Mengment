import config from "../../config";
import { TStudent } from "../student/student.interface";
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
  const result = await User.create(userData);
  if(Object.keys(result).length){
    //set id and _id as user
    studentData.id = result.id,
    studentData.user = result._id
  }

  return result;
};

const createUser = async (userdata: TUser) => {
  const user = new User(userdata);
  const result = await User.create(user);
  return result;
};

export const UserService = {
  createUser,
  createStudent,
};
