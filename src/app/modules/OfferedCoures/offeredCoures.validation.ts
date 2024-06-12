import { z } from "zod";
import { Days } from "./offeredCoures.constand";

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicdDeperment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().min(1),
    section: z.number().min(1),
    days:z.array( z.enum([...Days] as [string, ...string[]])),
    starTime: z.string().refine((time)=>{
      const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeFormatRegex.test(time)
    },{
      message:'In Valid Time Format, expected "HH:MM" in 24 hours format '
    }),
    endTime:z.string().refine((time)=>{
      const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeFormatRegex.test(time)
    },{
      message:'In Valid Time Format, expected "HH:MM" in 24 hours format '
    }),
  }).refine((body)=>{
      const start = new Date(`1970-01-01T${body.starTime}:00`)
      const end = new Date(`1970-01-01T${body.endTime}:00`)
      return end > start
  },{
    message:"Start Time should be before End time !"
  }),
});


const updateOfferedCouresValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number().min(1),
    days:z.array( z.enum([...Days] as [string, ...string[]])),
    starTime: z.string().refine((time)=>{
      const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeFormatRegex.test(time)
    },{
      message:'In Valid Time Format, expected "HH:MM" in 24 hours format '
    }),
    endTime:z.string().refine((time)=>{
      const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeFormatRegex.test(time)
    },{
      message:'In Valid Time Format, expected "HH:MM" in 24 hours format '
    }),
  }).refine((body)=>{
    const start = new Date(`1970-01-01T${body.starTime}:00`)
    const end = new Date(`1970-01-01T${body.endTime}:00`)
    return end > start
},{
  message:"Start Time should be before End time !"
}),
});


export const offeredCouresValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCouresValidationSchema,
};
