import { z } from "zod";

const UservalidationSchema = z.object({
  password: z.string({invalid_type_error:'Password must be string'}).max(20, { message: "Password can be more then 20 charactors" })
});


export const UserValidation = {
    UservalidationSchema
};