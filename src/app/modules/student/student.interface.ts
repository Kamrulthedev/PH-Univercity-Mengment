import { Schema, model, connect } from 'mongoose';



export type Gardians = {
    fatherName:string;
    fatherContectNo:string;
    fatherOccupation:string;
    fatherAddress:string;
    MatherName:string;
    MatherContectNo:string;
    MatherOccupation:string;
    MatherAddress:string;
};

export type UserName = {
    firstName:string;
    middleName:string;
    lastName:string;
};

export type LocalGardian ={
    name:string;
    occupation:string;
    ContectNO:string;
    address:string;   
};

export type Student = {
    id:string;
    name:UserName;
    gender:string;
    dateOfBirth:string;
    email: string;
    contectNo: string;
    emargecyContectNo:string;
    bloodGroup?:"A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    persentAddress:string;
    permenantAddress:string;
    gardians:Gardians;
    localGardian:LocalGardian;
    profileImg?:string;
    isActive:'active' | 'inactive'; 
  }
  