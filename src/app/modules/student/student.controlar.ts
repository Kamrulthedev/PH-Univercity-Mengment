import { Request, Response } from "express";
import { StudentService } from "./student.service";
import studentvalidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = studentvalidationSchema.parse(studentData);
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err:any) {
  res.status(500).json({
    success:false,
    message:"Student Create false",
    data:err
  })
    
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
        res.status(400).json({
      success: false,
      message: "someting is worng",
      errors: err.errors,
      name: "error",
    });
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
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "smoneting si worng",
      errors: err.errors,
      name: "error",
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentService.deleteStudentformDB(studentId);
    res.status(200).json({
      success:true,
      message:"Delete Student is Successfully",
      data:result
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "smoting wes worng",
      errros: err.message
    });
  }
};

export const studentControllar = {
  createStudent,
  getStudents,
  getASingleStudent,
  deleteStudent
};
