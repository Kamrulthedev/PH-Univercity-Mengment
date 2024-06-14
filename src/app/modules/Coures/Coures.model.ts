import { Schema, model } from "mongoose";
import {
  TCoures,
  TCouresFaculty,
  TPerRequisiteCourses,
} from "./Coures.interface";

export const perRequisiteCourseSchema = new Schema<TPerRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Coures" },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const courseSchema = new Schema<TCoures>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: { type: Number, trim: true, required: true },
  credits: { type: Number, trim: true, required: true },
  perRequisiteCourses: [perRequisiteCourseSchema],
  isDeleted: { type: Boolean },
});

export const Coures = model<TCoures>("Coures", courseSchema);

export const courseFacultiesSchema = new Schema<TCouresFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Coures",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const CouresFaculty = model<TCouresFaculty>(
  "CouresFaculty",
  courseFacultiesSchema,
);
