import { Request, Response } from "express";
import { StudentService } from "./student.service";
import studentvalidationSchema from "./student.validation";
import { ZodError } from "zod";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    
    //data validation Joi and using
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation Zod and using
    const zodParesData = studentvalidationSchema.parse(studentData);

    const result = await StudentService.createStudentInToDB(zodParesData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "someting was wrong student error to Joi",
    //     error: error.details,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      // Handle Zod validation error
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
        name:"ZODERROR"
      });
    }}
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.GetASingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "A Single Student Get is Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentControllar = {
  createStudent,
  getStudents,
  getASingleStudent,
};
