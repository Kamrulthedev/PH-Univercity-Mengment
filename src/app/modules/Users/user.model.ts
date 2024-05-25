import { Model, Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
  id: { 
    type: String, 
    required: true
 },
  password: {
     type: String, 
     required: true 
    },
  needsPasswordChange: {
    type: Boolean,
    required: true,
  },
  role:{
    type:String,
    enum: ['students' , 'admin', 'faculty']
  },
  status:{
    type:String,
    enum:['in-progress' , 'blocked']
  },
  isDeleted:{
    type:Boolean,
    required:true
  }
});
