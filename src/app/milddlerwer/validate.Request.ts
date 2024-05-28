import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";




const validationRequest = (Schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
     try{
       //validation
       await Schema.parseAsync({
          body: req.body,
        });
        next();
     }catch(err){
  next(err)
     }
    };
  };

  export default validationRequest;