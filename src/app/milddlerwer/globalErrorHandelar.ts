import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import handlerZodError from "../Error/handleZodError";
import handlerValidationError from "../Error/handleValidatoinError";
import { TErrorSources } from "../interface/error";
import handlerCastError from "../Error/handleCastError";
import AppError from "../Error/AppError";

const GlobalErrorHandel: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Somoting went wromng !";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "ValidatorError") {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handlerCastError(err);
    (statusCode = simplifiedError?.statusCode);
      (message = simplifiedError?.message);
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default GlobalErrorHandel;
