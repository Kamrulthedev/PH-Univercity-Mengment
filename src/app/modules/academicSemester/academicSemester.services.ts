import QueryBuilder from "../../builder/QueryFuilddrom";
import {
  academicSemesterNameCodeMapper,
  AcademicSemesterSearchableFields,
} from "./academicSemester.constend";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademincSemester = async (payload: TAcademicSemester) => {
  //validation with semester name and semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

//get all semester
const GetAllAcademicSemester = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const resultQuery  = await academicSemesterQuery.modelQuery;
  const countQuery = academicSemesterQuery.modelQuery.clone();

  const [result, total] = await Promise.all([
    resultQuery,
    countQuery.countDocuments().exec(),
  ]);

  const meta = { total };
  return {
    meta,
    result,
  };
};

//get a single academic semester data
const GetsingleAacadamic = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

//update Academic semester
const UpdateAcademicSemester = async (
  id: string,
  semesterData: Partial<TAcademicSemester>
) => {
  if (
    semesterData.name &&
    semesterData.code &&
    academicSemesterNameCodeMapper[semesterData.name] !== semesterData.code
  ) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, semesterData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademincSemester,
  GetAllAcademicSemester,
  GetsingleAacadamic,
  UpdateAcademicSemester,
};
