import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const isExistsUser = await User.isUserExsitsByCustomId(payload.id);

  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is Not Found !!");
  }

  //chack user status
  const deleteUser = isExistsUser?.isDeleted;
  if (deleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!");
  }

  //chack user status
  const UserSataus = isExistsUser?.status;
  if (UserSataus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!");
  }

  // Verify password
  const isPasswordValid = await User.isPasswordMaths(
    payload.password,
    isExistsUser.password
  );
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  };

//create token and sent to the user

const jwrPayload = {
  userId : isExistsUser,
  role: isExistsUser.role
}
const accessToken = jwt.sign()



  return {};
};

export const AuthService = {
  loginUser,
};
