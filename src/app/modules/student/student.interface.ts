import mongoose, { Types } from "mongoose";
import { Model } from "mongoose";

export type  Guardians = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  fatherAddress: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  motherAddress: string;
}

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGuardian  = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export type TStudent = {
  id: string;
  user: mongoose.Types.ObjectId;
  password: string;
  name: UserName;
  gender: string;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardians: Guardians;
  localGuardian: LocalGuardian;
  profileImg?: string;
  admissionSemester:Types.ObjectId;
  isDeleted?: boolean;
};



//for createing a statics
export interface StudentModel extends Model<TStudent> {
    isUserExists(id:string):Promise<TStudent | null>
};


// export type studentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModelM = Model<TStudent, {}, studentMethods>;
