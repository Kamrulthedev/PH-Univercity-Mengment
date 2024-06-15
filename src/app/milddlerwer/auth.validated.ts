import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

const AuthValidated = (...requierdRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You not Uauthorized !");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;
    const isExistsUser = await User.isUserExsitsByCustomId(userId);
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
    if (
      isExistsUser.passwordChangeAt &&
      User.isJWTIssuseBeforePasswoedChange(
        isExistsUser.passwordChangeAt,
        iat as number
      )
    ){
      throw new AppError(httpStatus.UNAUTHORIZED, "You are Not Authorized !")
    }
      if (requierdRole && !requierdRole.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "YOu are Not Authorized hi!"
        );
      }
    //decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default AuthValidated;
