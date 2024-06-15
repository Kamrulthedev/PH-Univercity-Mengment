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
  const user = req.user;
  const {...userData} = req.body;
  const result = await AuthService.changePassword(user, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Updated in successfully !",
    data: result,
  });
});

export const AuthControllars = {
  loginUserDb,
  changePasswordDb
};
