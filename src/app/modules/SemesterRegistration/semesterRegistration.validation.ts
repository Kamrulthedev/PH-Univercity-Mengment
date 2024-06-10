import { z } from "zod";
import { SemesterRegistrationStatus } from "./SemesterRegistration.consant";

const createsemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    starDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const SemesterRegistrationValidation = {
  createsemesterRegistrationValidationSchema,
};
