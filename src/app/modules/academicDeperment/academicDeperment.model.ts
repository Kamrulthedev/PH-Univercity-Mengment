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

academicDepermentSchema.pre('save', async function(next){
    const isDepermentExist = await AcademicDeperment.findOne({
        name:this.name,
    });
    if(isDepermentExist){
        throw new Error('This Deperment is already exist !!');
    }
    next()
});


academicDepermentSchema.pre('findOneAndUpdate', async function(next){
const query = this.getQuery;
  const isDepermentExist = await AcademicDeperment.findOne(query)
  if(!isDepermentExist){
    throw new Error('This deperment does not exist !!');
  }
  next()
});


export const AcademicDeperment = model<TAcademicDeperment>("AcademicDeperment", academicDepermentSchema);