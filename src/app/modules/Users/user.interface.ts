import { Model } from "mongoose";
import { USER_ROLE } from "./user.conestant";

//create a Type or interface
export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?:Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExsitsByCustomId(id: string): Promise<TUser>;

  isPasswordMaths(
    myPlaintextPassword: string,
    hashtextPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
