import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  const isExistsUser = await User.findOne({ id: payload?.id });

  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is Not Found !!");
  };

  const deleteUser = isExistsUser?.isDeleted;
  if (deleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!");
  };

  //chack user status
  const UserSataus = isExistsUser?.status;
  if (UserSataus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!");
  };

  return {};
};

export const AuthService = {
  loginUser,
};
