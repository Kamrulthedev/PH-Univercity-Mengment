import { NextFunction, Request, Response } from "express";



const GlobalErrorHandel = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Somehting went wromng";
    return res.status(statusCode).json({
      sucess: false,
      message: message,
      error: err,
    });
  };

  export default GlobalErrorHandel;