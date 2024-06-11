import { z } from "zod";
import { Days } from "./offeredCoures.constand";

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicdDeperment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().min(1),
    section: z.number().min(1),
    days: z.enum([...Days] as [string, ...string[]]),
    starTime: z.string(),
    endTime: z.string(),
  }),
});


const updateOfferedCouresValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().min(1).optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    starTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});


export const offeredCouresValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCouresValidationSchema,
};
