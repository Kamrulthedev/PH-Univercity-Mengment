import { Types } from "mongoose";

export type TPerRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCoures = {
  title: string;
  prefix: string;
  code: number;
  credits:number;
  isDeleted?:boolean;
  perRequisiteCourses: [TPerRequisiteCourses];
};


export type TCouresFaculty = {
     course: Types.ObjectId;
     faculties: [Types.ObjectId]
};