import { z } from 'zod';
import { Types } from 'mongoose';


const TPerRequisiteCoursesSchema = z.object({
  course: z.instanceof(Types.ObjectId),
  isDeleted: z.boolean(),
});


const CouresValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  perRequisiteCourses: z.array(TPerRequisiteCoursesSchema).optional(),
});

export const CouresValidation = {
    CouresValidationSchema
};