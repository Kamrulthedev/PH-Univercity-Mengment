import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";

const AuthValidated = (...requierdRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You not Uauthorized !");
    }

    //check valid token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "YOu are Not Authorized !"
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requierdRole && !requierdRole.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "YOu are Not Authorized hi!"
          );
        }
        //decoded
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default AuthValidated;
