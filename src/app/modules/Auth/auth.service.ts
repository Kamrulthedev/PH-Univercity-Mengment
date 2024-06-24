import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utilis";
import { sendEmail } from "../../utils/sendEmail";

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
    isExistsUser.password
  );
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  // Create token and send to the user
  const jwrPayload = {
    userId: isExistsUser.id,
    role: isExistsUser.role,
  };
  const accessToken = createToken(
    jwrPayload,
    config.jwt_access_secret as string,
    config.jwt_assess_exrpired as string
  );

  const refreshToken = createToken(
    jwrPayload,
    config.jwt_refreshtoken as string,
    config.jwt_refresh_exrpired as string
  );

  const needsPasswordChange = isExistsUser?.needsPasswordChange;
  return { accessToken, refreshToken, needsPasswordChange };
};

//change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // Checking if the user exists
  const isExistsUser = await User.isUserExsitsByCustomId(userData.userId);

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

  // Verify old password
  const isPasswordValid = await User.isPasswordMaths(
    payload.oldPassword,
    isExistsUser.password
  );
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.data_salt_rounds)
  );

  await User.findByIdAndUpdate(isExistsUser, {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  });

  return null;
};

//refreshToken
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refreshtoken as string
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExsitsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  if (
    user.passwordChangeAt &&
    User.isJWTIssuseBeforePasswoedChange(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_assess_exrpired as string
  );

  return {
    accessToken,
  };
};

//forget password
const forgetPassword = async (id: string) => {
  // checking if the user is exist
  const user = await User.isUserExsitsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const ResetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUiLink = `http://localhost:5000?id=${user.id}&token${ResetToken}`;

  sendEmail();

  
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
