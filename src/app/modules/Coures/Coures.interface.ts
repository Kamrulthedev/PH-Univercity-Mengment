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
  perRequisiteCourses: [];
};
