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

export const SemesterRegistrationValidation = {
  createsemesterRegistrationValidationSchema,
};
