import { Schema, model, connect } from "mongoose";
import { Gardians, LocalGardian, Student, UserName } from "./student.interface";

//schema create
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "This Name is not find please 20 cheracotrs"],
    // trim: true,
    validate:{
      validator:function(value : any){
        const firstNamevalue = value.charAt(0).toLocaleUpperCase() + value.slice(1)
        return firstNamevalue === value;
      },
      message:'{VALUE} is not found'
    },
  },
  middleName: { type: String, required: [true, "Middle name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
});

const localGuardianSchema = new Schema<LocalGardian>({
  name: { type: String, required: [true, "Local guardian name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
  },
  contectNO: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
  },
});

const guardianSchema = new Schema<Gardians>({
  fatherName: { type: String, required: [true, "Father name is required"] },
  fatherContectNo: {
    type: String,
    required: [true, "Father contact number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
  },
  fatherAddress: {
    type: String,
    required: [true, "Father address is required"],
  },
  matherName: { type: String, required: [true, "Mother name is required"] },
  matherContectNo: {
    type: String,
    required: [true, "Mother contact number is required"],
  },
  matherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  matherAddress: {
    type: String,
    required: [true, "Mother address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
    maxlength: [10, "This Name is not find please 10 cheracotrs"],
  },
  gender: { type: String, required: [true, "Gender is required"] },
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  email: { type: String, required: [true, "Email is required"] },
  contectNo: { type: String, required: [true, "Contact number is required"] },
  emargecyContectNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    message: "Invalid blood group",
  },
  persentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permenantAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  gardians: {
    type: guardianSchema,
    required: [true, "Guardians information is required"],
  },
  localGardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "block"],
    default: "active",
    required: [true, "Active status is required"],
  },
});

//model create
export const StudentModel = model<Student>("Student", studentSchema);
