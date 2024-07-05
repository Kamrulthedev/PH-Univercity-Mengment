import { z } from "zod";

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
    isDeleted: z.boolean().optional(),
    perRequisiteCourses: z.array(TPerRequisiteCoursesSchema).optional(),
  }),
});

//update Course
const UpdatePerRequisiteCoursesSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const UpdateCouresValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    perRequisiteCourses: z.array(UpdatePerRequisiteCoursesSchema).optional(),
  }),
});

//Fcultise with Course
const assignFacultiseWithCourseValidaitonSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CouresValidation = {
  CouresValidationSchema,
  UpdateCouresValidationSchema,
  assignFacultiseWithCourseValidaitonSchema,
};
