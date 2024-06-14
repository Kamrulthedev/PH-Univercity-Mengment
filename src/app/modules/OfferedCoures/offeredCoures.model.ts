import mongoose, { Schema, model } from "mongoose";
import { TOfferedCoures } from "./offeredCoures.interface";
import { Days } from "./offeredCoures.constand";

export const offeredCourseSchema = new mongoose.Schema<TOfferedCoures>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    academicdDeperment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDeperment",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "CouresFaculty",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    starTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const offeredCoures = model<TOfferedCoures>(
  "offeredCoures",
  offeredCourseSchema,
);
