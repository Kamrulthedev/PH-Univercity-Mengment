import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryFuilddrom";
import { SemesterRegistrationValidatStatus } from "./SemesterRegistration.consant";

//create Semester Registration
const createSemesterRegistration = async (payoad: TSemesterRegistration) => {
  //find academic semester in the database
  const academicSemester = payoad?.academicSemester;

  //check if there any registered semester that is alredy UPCOMING | ONGOING;
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationValidatStatus.UPCOMING },
        { status: SemesterRegistrationValidatStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSemester.status} Registration Semester`,
    );
  }

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  const isAcademicSemesterRegistrationExists =
    await SemesterRegistration.findOne({
      academicSemester,
    });

  //check if the semester is exist
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Not Found Academic Semester!");
  }

  //check if the semester is already registered !
  if (isAcademicSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "Academic Semeter aleady exsits!");
  }

  const result = await SemesterRegistration.create(payoad);
  return result;
};

//get all Semester Registration
const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistation = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

const updateSemesterRegistaion = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if the requested registered semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  const curentSemester = isSemesterRegistrationExists?.status;
  const requrestSemester = payload?.status;

  //check if the requested registered semester is exists
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is not Found !");
  }

  //if the requrested semester is ended , we will not update anything
  if (curentSemester === SemesterRegistrationValidatStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester already ${curentSemester}`,
    );
  }

  //UPCOMING -->ONGOING-->ENDED
  //--1
  if (
    curentSemester === SemesterRegistrationValidatStatus.UPCOMING &&
    requrestSemester === SemesterRegistrationValidatStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${curentSemester} to ${requrestSemester}`,
    );
  }

  //--2
  if (
    curentSemester === SemesterRegistrationValidatStatus.ONGOING &&
    requrestSemester == SemesterRegistrationValidatStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${curentSemester} to ${requrestSemester}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  updateSemesterRegistaion,
  getAllSemesterRegistration,
  getSingleSemesterRegistation,
};
