import { Schema, model } from "mongoose";
import {
  Gardians,
  LocalGardian,
  StudentModel,
  TStudent,
  UserName,
} from "./student.interface";

//schema create
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "This Name is not find please 20 cheracotrs"],
  },
  middleName: { type: String, required: [true, "Middle name is required"] },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
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

export const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
      ref: "User",
    },
    password: {
      type: String,
      required: true,
      max: [20, "Password must be 20 charctur"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
      maxlength: [10, "This Name is not find please 10 cheracotrs"],
    },
    gender: { type: String, required: [true, "Gender is required"] },
    dateOfBirth: {type: Date},
    email: {
      type: String,
      required: [true, "Email is required"],
      unique:true
    },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

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
