import { z } from "zod";
import { Types } from "mongoose";

const TPerRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const CouresValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    perRequisiteCourses: z.array(TPerRequisiteCoursesSchema).optional(),
  }),
});

export const CouresValidation = {
  CouresValidationSchema,
};
