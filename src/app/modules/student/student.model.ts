import { Schema, model, connect } from "mongoose";
import { Gardians, LocalGardian, Student, UserName } from "./student.interface";



//schema create
const studentName = new Schema<UserName>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
});


const localGardianSchema = new Schema<LocalGardian>({
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contectNO: { type: String, required: true },
        address: { type: String, required: true },
});

const gardianSchema = new Schema<Gardians>({
    fatherName: { type: String, required: true },
    fatherContectNo: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherAddress: { type: String, required: true },
    matherName: { type: String, required: true },
    matherContectNo: { type: String, required: true },
    matherOccupation: { type: String, required: true },
    matherAddress: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name:studentName,
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contectNo: { type: String, required: true },
  emargecyContectNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  persentAddress: { type: String, required: true },
  permenantAddress: { type: String, required: true },
  gardians: gardianSchema,
  localGardian:localGardianSchema,
  profileImg: { type: String },
  isActive: ["active", "block"],
});

//model create

const Student = model<Student>('Student', studentSchema)
