import z from "zod";

// UserName Schema
const userNamevalidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

// LocalGuardian Schema
const localGuardianvalidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contectNO: z.string(),
  address: z.string(),
});

// Guardians Schema
const guardianvalidationSchema = z.object({
  fatherName: z.string(),
  fatherContectNo: z.string(),
  fatherOccupation: z.string(),
  fatherAddress: z.string(),
  matherName: z.string(),
  matherContectNo: z.string(),
  matherOccupation: z.string(),
  matherAddress: z.string(),
});

// Student validation Schema
const createStudentvalidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNamevalidationSchema,
      gender: z.enum(["male", "famale", "other"]),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contectNo: z.string(),
      emargecyContectNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      persentAddress: z.string(),
      permenantAddress: z.string(),
      gardians: guardianvalidationSchema,
      localGardian: localGuardianvalidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentvalidations = {
  createStudentvalidationSchema,
};
