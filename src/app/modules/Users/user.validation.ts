import { z } from "zod";

const UservalidationSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  password: z.string().max(20, { message: "Password can be more then 20 charactors" }),
  needsPasswordChange: z.boolean({ required_error: "NeedsPasswordChange is required" }),
  role: z.enum(['students', 'admin', 'faculty'], { required_error: "Role is required" }),
  status: z.enum(['in-progress', 'blocked'], { required_error: "Status is required" }),
  isDeleted: z.boolean({ required_error: "IsDeleted is required" }).optional(),
});


export const UserValidation = {
    UservalidationSchema
};