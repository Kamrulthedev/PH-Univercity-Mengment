import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constend";


const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum:AcademicSemesterName
    },
    year: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      required: true,
      enum:AcademicSemesterCode
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    }
  },
  {
    timestamps: true,
  }
);


export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)