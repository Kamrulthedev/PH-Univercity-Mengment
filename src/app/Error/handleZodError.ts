import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

// Define your error handler for Zod errors
const handlerZodError = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1] as string, // Ensure path is a string
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

export default handlerZodError;
