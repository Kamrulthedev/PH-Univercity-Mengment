import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";

const GlobalErrorHandel: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Somoting went wromng !";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Somehting went wromng !",
    },
  ];

  // Define your error handler for Zod errors
  const handlerZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;

    return {
      statusCode,
      message: "Zod Validation Error",
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    sucess: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default GlobalErrorHandel;
