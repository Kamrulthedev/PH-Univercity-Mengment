import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service";

const createUserDb = async(req:Request, res:Response) =>{
    try{
        const userdata = req.body;
        const result = await UserService.createUser(userdata);
        res.status(200).json({
          success:true,
          message:"User Created Successfully",
          data:result
        });
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:false
        })
    }

};



export const UserControllar = {
    createUserDb
};