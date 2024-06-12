import { z } from "zod";

const loginValidatoinSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required." }),
    password: z.string({ required_error: "Passerod is required. " }),
  }),
});

export const AuthValidation = {
  loginValidatoinSchema,
};
