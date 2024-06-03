import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handlerCastError = (err:mongoose.Error.CastError):TGenericErrorResponse =>{
    
    const errorSources:TErrorSources = [
     {
        path:err.path,
        message:err.message
     }
    ];
    
    
    
    const statusCode = 400;
    return {
      statusCode,
      message: "Validation Error",
      errorSources,
    };
};

export default handlerCastError;