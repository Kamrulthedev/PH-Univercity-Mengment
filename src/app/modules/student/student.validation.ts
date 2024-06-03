import { z } from "zod";

// Name Schema
const nameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Guardians Schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  fatherAddress: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
  motherAddress: z.string(),
});

// Student validation Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string(), 
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardians: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester:z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

//update validation

const updateUsernameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updatelocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
}).optional(); // Mark this schema as optional

const updateguardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherAddress: z.string().optional(),
  motherName: z.string().optional(),
  motherContactNo: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherAddress: z.string().optional(),
}).optional(); 

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUsernameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(), 
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardians: updateguardianValidationSchema,
      localGuardian: updatelocalGuardianValidationSchema,
      admissionSemester:z.string().optional(),
      profileImg: z.string().optional()  ,
    }),
  }),
});

export const studentvalidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
