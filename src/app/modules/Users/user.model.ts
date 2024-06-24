import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

// Create a Mongoose Schema
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//pre save middlewere
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.data_salt_rounds)
  );
  next();
});

//post save middlerware hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExsitsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

// Static method to compare passwords
userSchema.statics.isPasswordMaths = async function (
  myPlaintextPassword: string,
  hashtextPassword: string
): Promise<boolean> {
  return await bcrypt.compare(myPlaintextPassword, hashtextPassword);
};

userSchema.statics.isJWTIssuseBeforePasswoedChange = function (
  passwordChangeTimestamp: Date,
  jwtIssuesdTimeStamp: number
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuesdTimeStamp;
};

//create model
export const User = model<TUser, UserModel>("User", userSchema);
