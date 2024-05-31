import { Schema, SchemaType, model } from "mongoose";
import TAcademicDeperment from "./academicDeperment.interface";



const academicDepermentSchema = new Schema<TAcademicDeperment>(
{
    name:{type:String,
        required:true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty'
    }
},{
    timestamps:true
});

export const AcademicDeperment = model<TAcademicDeperment>("AcademicDeperment", academicDepermentSchema)