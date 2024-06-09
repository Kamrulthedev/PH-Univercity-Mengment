import { Schema, model } from "mongoose";
import { TCoures, TPerRequisiteCourses } from "./Coures.interface";

export const perRequisiteCourseSchema = new Schema<TPerRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Coures" },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const courseSchema = new Schema<TCoures>({
  title: { type: String,
     unique: true,
      trim: true,
       required: true
       },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: { type: Number,
     trim: true,
      required: true
     },
     credits:{type:Number, 
      trim: true,
      required: true
     },

  perRequisiteCourses: [perRequisiteCourseSchema],
});

export const Coures = model<TCoures>("Coures", courseSchema);
