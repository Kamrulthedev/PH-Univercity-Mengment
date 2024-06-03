import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const GlobalErrorHandel: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message  || "Somoting went wromng !";

  type TErrorSource = {
    path: string | number;
    message: string;
  };

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Somehting went wromng !",
    },
  ];

  if(err instanceof ZodError) {
    statusCode = 400,
    message = "AMi ZOD ERROR"
  }
  return res.status(statusCode).json({
    sucess: false,
    message,
    errorSources,
    amiError: err,
  });
};

export default GlobalErrorHandel;
