import QueryBuilder from "../../builder/QueryFuilddrom";
import { AdminSearchableFields } from "./admin.constand";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

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
  const result = await Admin.findById(id);
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
  const result = await Admin.findByIdAndUpdate({id}, modifiedUpdateData, {
    new:true, runValidators:true
  })
  return result;
};

export const AdminService = {
  getAllAdmin,
  getSingelAdmin,
  updateAdmin
};
