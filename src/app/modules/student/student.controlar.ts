import { Request, Response } from "express";
import { StudentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentService.createStudentInToDB(studentData);

    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "someting was wrong student",
      error: err,
    });
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
