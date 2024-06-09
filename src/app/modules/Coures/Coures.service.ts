import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryFuilddrom";
import { CouresSearchablaFileds } from "./Coures.constant";
import { TCoures, TCouresFaculty } from "./Coures.interface";
import { Coures, CouresFaculty } from "./Coures.model";
import httpStatus from "http-status";
import AppError from "../../Error/AppError";

const createCoures = async (payload: TCoures) => {
  const result = await Coures.create(payload);
  return result;
};

const getAllCoures = async (query: Record<string, unknown>) => {
  const GetQuery = new QueryBuilder(
    Coures.find().populate("perRequisiteCourses.course"),
    query
  )
    .search(CouresSearchablaFileds)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await GetQuery.modelQuery;
  return result;
};

const getSingleCoures = async (id: string) => {
  const result = await Coures.findById(id).populate(
    "perRequisiteCourses.course"
  );
  return result;
};

//update Course
const updateCorse = async (id: string, payload: Partial<TCoures>) => {
  const { perRequisiteCourses, ...CouresRemeaninigData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const BasicUpdate = await Coures.findByIdAndUpdate(
      id,
      CouresRemeaninigData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!BasicUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to Upadate Course !");
    }
    //check if thear is any per requisite courses to update
    if (perRequisiteCourses && perRequisiteCourses.length > 0) {
      //filter out the deleted fields
      const deletedPreRequisites = perRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisitesCourses = await Coures.findByIdAndUpdate(id, {
        $pull: {
          perRequisiteCourses: { course: { $in: deletedPreRequisites } },
        },
      });
      //filter out the new Curse Fields
      const newPerReuisites = perRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPerPeuisitesCurse = await Coures.findByIdAndUpdate(id, {
        $addToSet: { perRequisiteCourses: { $each: newPerReuisites } },
      });
      const result = await Coures.findById(id).populate(
        "perRequisiteCourses.course"
      );
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Faild to Update Course");
  }
};

//delete Course
const deleteCoures = async (id: string) => {
  const result = await Coures.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//assign Facultise
const assignFacultiseWithCourse = async (
  id: string,
  payload: Partial<TCouresFaculty>
) => {
  const result = await CouresFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new:true
    }
  );
  return result;
};

//export course
export const CouresService = {
  createCoures,
  getAllCoures,
  getSingleCoures,
  updateCorse,
  deleteCoures,
  assignFacultiseWithCourse,
};
