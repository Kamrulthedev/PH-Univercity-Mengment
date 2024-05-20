import { Schema, model, connect } from "mongoose";

export type Gardians = {
  fatherName: string;
  fatherContectNo: string;
  fatherOccupation: string;
  fatherAddress: string;
  matherName: string;
  matherContectNo: string;
  matherOccupation: string;
  matherAddress: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGardian = {
  name: string;
  occupation: string;
  contectNO: string;
  address: string;
};

export type Student = {
  id?: string;
  name: UserName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contectNo: string;
  emargecyContectNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  persentAddress: string;
  permenantAddress: string;
  gardians: Gardians;
  localGardian: LocalGardian;
  profileImg?: string | undefined;
  isActive: "active" | "block";
};
