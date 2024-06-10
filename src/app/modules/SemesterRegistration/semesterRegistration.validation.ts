import { z } from "zod";


const createsemesterRegistrationValidationSchema = z.object({
    body:z.object({

    })
});

export const SemesterRegistrationValidation = {
    createsemesterRegistrationValidationSchema
};