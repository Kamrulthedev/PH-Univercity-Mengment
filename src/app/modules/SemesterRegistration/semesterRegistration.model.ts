import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";


export const semesterRegistrationSchema = new Schema<TSemesterRegistration>({

});


export const SemesterRegistration = model<TSemesterRegistration>("SemesterRegistration", semesterRegistrationSchema)