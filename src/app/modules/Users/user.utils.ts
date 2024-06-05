import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  //   //205001    0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

// //year semester 4 digit number
export const generatStudentId = async (payload: TAcademicSemester) => {
  //   //first time 0000
  let currentId = (0).toString();

  const lastStudentId = await findLastStudent();
  //2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); //00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

//create a Faculty ID

export const findLAstFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLAstFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `F-${incrementId}`;
  return incrementId;
};
