import { Schema, model, connect } from "mongoose";
import { Student } from "./student.interface";

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required:true },
    middleName: { type: String, required:true},
    lastName: { type: String, required:true},
  },
  gender: { type: String , required:true },
  dateOfBirth: { type: String , required:true},
  email: { type: String , required:true},
  contectNo: { type: String , required:true},
  emargecyContectNo: { type: String , required:true},
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  persentAddress:{type: String , required:true},
  permenantAddress:{type:String , required:true},
  gardians:{
    fatherName:{type:String , required:true},
    fatherContectNo:{type:String , required:true},
    fatherOccupation:{type:String , required:true},
    fatherAddress:{type:String , required:true},
    matherName:{type:String , required:true},
    matherContectNo:{type:String , required:true},
    matherOccupation:{type:String , required:true},
    matherAddress:{type:String , required:true}
  },
  localGardian:{
    name:{type:String , required:true},
    occupation:{type:String , required:true},
    contectNO:{type:String , required:true},
    address:{type:String , required:true}
  },
  profileImg:{type:String },
  isActive: ['active', 'block']

});
