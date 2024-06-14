import { z } from "zod";

const UservalidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "passwoed can not be more than 20 characters" })
    .optional(),
});

export const UserValidation = {
  UservalidationSchema,
};
