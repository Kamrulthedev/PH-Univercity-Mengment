import { Request, Response } from "express";
import { StudentService } from "./student.service";



const createStudent = async(req :Request, res: Response) =>{
    try{
        const {student: studentData} = req.body;
        const result = await StudentService.createStudentInToDB(studentData);

        res.status(2000).json({
            success:true,
            message: "Student Created Successfully",
            data:result
        })
    }catch(error){
        console.log(error)
    };
};


export const studentControllar = {
    createStudent
};