import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import { TOfferedCoures } from "./offeredCoures.interface";
import { offeredCoures } from "./offeredCoures.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDeperment } from "../academicDeperment/academicDeperment.model";
import { Coures } from "../Coures/Coures.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./offered.utils";

const createOfferedCourse = async (payload: TOfferedCoures) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicdDeperment,
    course,
    section,
    faculty,
    days,
    starTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists!
  const isSemesterRegistratioinExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistratioinExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Not Found Semester Registation !"
    );
  }

  //check if the Academic Faculty Not Found id is exists!
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Academic Faculty !");
  }

  const academicSemester = isSemesterRegistratioinExits.academicSemester;

  //check if the Academic Deperment Not Found id is exists!
  const isAcademicdDepermentExits =
    await AcademicDeperment.findById(academicdDeperment);
  if (!isAcademicdDepermentExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Academic Deperment !");
  }

  //check if the course Not Found id is exists!
  const isCourseExits = await Coures.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Course !");
  }

  //check if the Faculty Not Found id is exists!
  const isFacultytExits = await Faculty.findById(faculty);
  if (!isFacultytExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Faculty !");
  }

  //check if the same course same section in name registraed semester
  const isSemesterOfferedCourseExistsWithSemesterRegister =
    await offeredCoures.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSemesterOfferedCourseExistsWithSemesterRegister) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Offered Course with section is already exists !"
    );
  }


  //check if the depertment is belong to the faculty
  const isDapertmentBelongToFaculty = await AcademicDeperment.findOne({ 
    _id:academicdDeperment,
    academicFaculty,

  });

  if(!isDapertmentBelongToFaculty){
    throw new AppError(httpStatus.NOT_FOUND, `This ${academicdDeperment} is not belong to this ${academicFaculty}`)
  }


  //get the schedules of the faculties
  const assignSchedules = await offeredCoures
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select("days starTime endTime");

  const newSchedules = {
    days,
    starTime,
    endTime,
  };

    if(hasTimeConflict(assignSchedules, newSchedules)){
      throw new AppError(httpStatus.CONFLICT,"This faculty is not available at that time ! Choose other time or day")
    }


  const result = await offeredCoures.create({ ...payload, academicSemester });
  return result;
};

//get all offered Course
const GetAllOfferedCourse = async () => {
  const result = await offeredCoures.find();
  return result;
};

//get single Offered Course
const GetSIngleOfferedCourse = async (id: string) => {
  const result = await offeredCoures.findById(id);
  return result;
};

//update offered course
const UpadateOfferedCourse = async (id:string, payload:Pick<TOfferedCoures, "faculty" | "days" | "starTime" | "endTime">) => {
  const {faculty, days, starTime, endTime} = payload;


  const isofferedCouresExists = await offeredCoures.findById(id)
  if(!isofferedCouresExists){
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course Not Found !!")
  };

const isFacultytExists = await Faculty.findById(faculty);
console.log(isFacultytExists)
if(!isFacultytExists){
  throw new AppError(httpStatus.NOT_FOUND, "Faculty Not Faound !!")
};

const semesterRegistration = isofferedCouresExists.semesterRegistration;

const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
if(semesterRegistrationStatus?.status !== "UPCOMING" ){
throw new AppError(httpStatus.BAD_REQUEST, "You can Not Update this offered course ENDED!!")
};


  //get the schedules of the faculties
  const assignSchedules = await offeredCoures
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select("days starTime endTime");

  const newSchedules = {
    days,
    starTime,
    endTime,
  };

    if(hasTimeConflict(assignSchedules, newSchedules)){
      throw new AppError(httpStatus.CONFLICT,"This faculty is not available at that time ! Choose other time or day")
    }


  const result = await offeredCoures.findByIdAndUpdate(id, payload, {
    new:true,
    runValidators:true
  });
  return result;
};

export const OfferedCouresService = {
  createOfferedCourse,
  GetAllOfferedCourse,
  GetSIngleOfferedCourse,
  UpadateOfferedCourse,
};
