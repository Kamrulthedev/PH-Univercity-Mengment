import { z } from "zod";
import { SemesterRegistrationStatus } from "./SemesterRegistration.consant";

const createsemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(), // Ideally, use a regex pattern to validate ObjectId
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(), // Fixed spelling from starDate to startDate
    endDate: z.string().datetime(),
    minCredit: z.number().min(3).default(3),
    maxCredit: z.number().max(15).default(15),
  }),
});

const updatesemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(), // Fixed spelling from starDate to startDate
    endDate: z.string().datetime().optional(),
    minCredit: z.number().min(3).default(3).optional(),
    maxCredit: z.number().max(15).default(15).optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createsemesterRegistrationValidationSchema,
  updatesemesterRegistrationValidationSchema,
};
