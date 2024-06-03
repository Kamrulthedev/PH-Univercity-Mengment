import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


// Define the handler function for mongoose validation errors
const handlerValidationError = (err: mongoose.Error.ValidationError) :TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.values(err.errors).map(
      (vaL: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: vaL.path,
          message: vaL.message,
        };
      }
    );


    const statusCode = 400;
    return {
      statusCode,
      message: "Validation Error",
      errorSources,
    };
};


export default handlerValidationError;