import z from "zod";

// UserName Schema
const userNamevalidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "This Name is not find please 20 characters" })
    .min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

// LocalGuardian Schema
const localGuardianvalidationSchema = z.object({
  name: z.string().min(1, { message: "Local guardian name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian occupation is required" }),
  contectNO: z
    .string()
    .min(1, { message: "Local guardian contact number is required" }),
  address: z.string().min(1, { message: "Local guardian address is required" }),
});

// Guardians Schema
const guardianvalidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father name is required" }),
  fatherContectNo: z
    .string()
    .min(1, { message: "Father contact number is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father occupation is required" }),
  fatherAddress: z.string().min(1, { message: "Father address is required" }),
  matherName: z.string().min(1, { message: "Mother name is required" }),
  matherContectNo: z
    .string()
    .min(1, { message: "Mother contact number is required" }),
  matherOccupation: z
    .string()
    .min(1, { message: "Mother occupation is required" }),
  matherAddress: z.string().min(1, { message: "Mother address is required" }),
});

// Student Schema
const studentvalidationSchema = z.object({
    id: z.string().optional(),
    password: z.string().max(20),
    name: userNamevalidationSchema,
    gender: z.string().min(1, { message: "Gender is required" }),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    contectNo: z.string().min(1, { message: "Contact number is required" }),
    emargecyContectNo: z
      .string()
      .min(1, { message: "Emergency contact number is required" }),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Invalid blood group",
      })
      .optional(),
    persentAddress: z
      .string()
      .min(1, { message: "Present address is required" }),
    permenantAddress: z
      .string()
      .min(1, { message: "Permanent address is required" }),
    gardians: guardianvalidationSchema,
    localGardian: localGuardianvalidationSchema,
    profileImg: z.string().optional(),
  });

export const studentvalidations = {
  studentvalidationSchema,
};
