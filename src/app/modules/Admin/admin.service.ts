import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryFuilddrom";
import { AdminSearchableFields } from "./admin.constand";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { User } from "../users/user.model";

//get all admins
const getAllAdmin = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;
  return result;
};
//get single admin
const getSingelAdmin = async (id: string) => {
  const result = await Admin.findOne({id});
  return result;
};

//update admin
const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingAdminData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new:true, runValidators:true
  })
  return result;
};

//delete admin
const deleteAdmin = async(id:string) =>{
     const session = await mongoose.startSession();
     try{
      session.startTransaction();
      const deletedAdmin = await Admin.findByIdAndUpdate(id, {isDeleted:true}, {new:true, session})
      if(!deletedAdmin){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin")
      }
      const userId = deletedAdmin?.user;
      const deleteUser = await User.findOneAndUpdate(
        userId,
        {isDeleted:true},
        {new:true, session}
      );
      if(!deleteUser){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User")
      }
      await session.commitTransaction();
      await session.endSession();
      return deletedAdmin;
     }catch(err:any){
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err)
     }
};

export const AdminService = {
  getAllAdmin,
  getSingelAdmin,
  updateAdmin,
  deleteAdmin
};
