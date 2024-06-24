import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

const loginUserDb = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePasswordDb = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...userData } = req.body;
  const result = await AuthService.changePassword(user, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Updated in successfully !",
    data: result,
  });
});

//refreshToken
const refreshTokenDb = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

//forget password
const forgetPasswordDb = catchAsync(async (req, res) => {
  const userID = req.body.id;
  const result = await AuthService.forgetPassword(userID);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link is genareted succesfully!",
    data: result,
  });
});


//forget password
const resetPasswordDb = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Reset succesfully.",
    data: result,
  });
});

export const AuthControllars = {
  loginUserDb,
  changePasswordDb,
  refreshTokenDb,
  forgetPasswordDb,
  resetPasswordDb,
};
