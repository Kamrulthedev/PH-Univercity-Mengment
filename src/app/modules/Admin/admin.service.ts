import QueryBuilder from "../../builder/QueryFuilddrom";
import { AdminSearchableFields } from "./admin.constand";
import { Admin } from "./admin.model";

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


const getSingelAdmin = async(id:string)=>{
    const result = await Admin.findById(id);
    return result;
};

export const AdminService = {
  getAllAdmin,
  getSingelAdmin
};
