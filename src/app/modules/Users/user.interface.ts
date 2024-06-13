import { Model } from "mongoose";

//create a Type or interface
export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExsitsByCustomId(id:string):Promise<TUser>
}
