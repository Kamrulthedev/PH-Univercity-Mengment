import { Request, Response } from "express";
import { StudentService } from "./student.service";
import studentValidationSchema from "./student.validation.Joi";
import zod from "zod";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentValidationZod = zod.object({
      id: zod.string(),
      name:zod.object({
        firstName:zod.string()
           .max(20, {
            message:'First Name can be must be give us'
           })
      })
    });

    const { student: studentData } = req.body;
    //data validation Joi and using
    const { error, value } = studentValidationSchema.validate(studentData);

    const result = await StudentService.createStudentInToDB(value);
    if (error) {
      res.status(500).json({
        success: false,
        message: "someting was wrong student error to Joi",
        error: error.details,
      });
    }
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err) {}
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
