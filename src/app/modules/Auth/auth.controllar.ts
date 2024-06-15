import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUserDb = catchAsync(async (req, res, next) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    data: result,
  });
});

const changePasswordDb = catchAsync(async (req, res, next) => {
  // const result = await AuthService.changePassword();
  console.log(req.user, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    data: null,
  });
});

export const AuthControllars = {
  loginUserDb,
  changePasswordDb
};
