import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const isExistsUser = await User.isUserExsitsByCustomId(payload.id);

  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is Not Found !!");
  }

  // Check user status
  if (isExistsUser.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!");
  }

  if (isExistsUser.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!");
  }

  // Verify password
  const isPasswordValid = await User.isPasswordMaths(
    payload.password,
    isExistsUser.password,
  );
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  // Create token and send to the user
  const jwrPayload = {
    userId: isExistsUser.id,
    role: isExistsUser.role,
  };

  const accessToken = jwt.sign(jwrPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  const needsPasswordChange = isExistsUser?.needsPasswordChange;

  return { accessToken, needsPasswordChange };
};

export const AuthService = {
  loginUser,
};
