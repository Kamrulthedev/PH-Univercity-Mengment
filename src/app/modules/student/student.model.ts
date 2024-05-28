import mongoose, { Schema, model } from "mongoose";
import {
  Guardians,
  LocalGuardian,
  TStudent,
  UserName,
} from "./student.interface";

//schema create
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "First name must be less than 20 characters"],
  },
  middleName: { type: String, maxlength: [20, "Middle name must be less than 20 characters"] },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxlength: [20, "Last name must be less than 20 characters"],
  },
});
//create localgardian
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local guardian name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
  },
});



// Guardians Schema
const guardianSchema = new Schema<Guardians>({
  fatherName: { type: String, required: [true, "Father name is required"] },
  fatherContactNo: {
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
  motherName: { type: String, required: [true, "Mother name is required"] },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  motherAddress: {
    type: String,
    required: [true, "Mother address is required"],
  },
});

// Student validation Schema
const studentSchema = new Schema<TStudent>({
  id: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
    maxlength: [20, "Password must be less than 20 characters"],
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: { type: String, required: [true, "Gender is required"] },
  dateOfBirth: { type: Date, required: [true, "Date of birth is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood group is required"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardians: {
    type: guardianSchema,
    required: [true, "Guardians information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON: {
    virtuals: true,
  },
});

//virtual crate
studentSchema.virtual("full Name").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//quary Middlewer
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//post seve middlewere
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//create a static
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// // //model create
export const Student = model<TStudent>("Student", studentSchema);
