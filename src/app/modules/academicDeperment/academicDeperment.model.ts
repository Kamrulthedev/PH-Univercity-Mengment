import { Schema, SchemaType, model } from "mongoose";
import TAcademicDeperment from "./academicDeperment.interface";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

const academicDepermentSchema = new Schema<TAcademicDeperment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

//create a pre hook middlerwaer
// academicDepermentSchema.pre("save", async function (next) {
//   const isDepermentExist = await AcademicDeperment.findOne({
//     name: this.name,
//   });
//   if (isDepermentExist) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "This Deperment is already exist !!"
//     );
//   }
//   next();
// });

//create a pre hook middleware
academicDepermentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepermentExist = await AcademicDeperment.findOne(query);
  if (!isDepermentExist) {
    return next(
      new AppError(httpStatus.NOT_FOUND, "This department does not exist !!")
    );
  }
  next();
});

//export 
export const AcademicDeperment = model<TAcademicDeperment>(
  "AcademicDeperment",
  academicDepermentSchema
);
