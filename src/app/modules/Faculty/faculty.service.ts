import QueryBuilder from "../../builder/QueryFuilddrom";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";


//get all faculty
const getAllFacutly = async (query: Record<string, unknown>) => {
  const facultQuery = new QueryBuilder(
    Faculty.find().populate("academicDepartment"),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultQuery.modelQuery;
  return result;
};
//get single faculty
const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findOne({id}).populate("academicDepartment");
  return result;
};

//faculty update
const updataFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && Object.keys(name).length) {
    for(const [key, value] of Object.entries(name)){
        modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new:true, runValidators:true
  })
  return result;
};

export const FacultyService = {
  getAllFacutly,
  getSingleFaculty,
  updataFaculty
};
