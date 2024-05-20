
import  z  from 'zod';

// UserName Schema
const userNamevalidationSchema = z.object({
    firstName: z
      .string()
      .max(20, "This Name is not find please 20 characters")
      .min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z
      .string()
      .min(1, "Last name is required"),
  });

// LocalGuardian Schema
const localGuardianvalidationSchema = z.object({
    name: z.string().min(1, "Local guardian name is required"),
    occupation: z.string().min(1, "Local guardian occupation is required"),
    contectNO: z.string().min(1, "Local guardian contact number is required"),
    address: z.string().min(1, "Local guardian address is required"),
  });
  
  
// Guardians Schema
const guardianvalidationSchema = z.object({
    fatherName: z.string().min(1, "Father name is required"),
    fatherContectNo: z.string().min(1, "Father contact number is required"),
    fatherOccupation: z.string().min(1, "Father occupation is required"),
    fatherAddress: z.string().min(1, "Father address is required"),
    matherName: z.string().min(1, "Mother name is required"),
    matherContectNo: z.string().min(1, "Mother contact number is required"),
    matherOccupation: z.string().min(1, "Mother occupation is required"),
    matherAddress: z.string().min(1, "Mother address is required"),
  });


  // Student Schema
const studentvalidationSchema = z.object({
    id: z.string().optional(),
    name: userNamevalidationSchema,
    gender: z.string().min(1, "Gender is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required"),
    contectNo: z.string().min(1, "Contact number is required"),
    emargecyContectNo: z.string().min(1, "Emergency contact number is required"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
    persentAddress: z.string().min(1, "Present address is required"),
    permenantAddress: z.string().min(1, "Permanent address is required"),
    gardians: guardianvalidationSchema,
    localGardian: localGuardianvalidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(["active", "block"]).default("active"),
  });