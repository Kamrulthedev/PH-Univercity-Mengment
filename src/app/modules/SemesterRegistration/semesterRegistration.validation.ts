import { z } from "zod";


const semesterRegistrationValidationSchema = z.object({
    body:z.object({

    })
});

export const SemesterRegistrationValidation = {
   semesterRegistrationValidationSchema
};