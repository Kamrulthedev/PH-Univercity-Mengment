import QueryBuilder from "../../builder/QueryFuilddrom";
import { CouresSearchablaFileds } from "./Coures.constant";
import { TCoures } from "./Coures.interface";
import { Coures } from "./Coures.model";

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

const updateCorse = async (id: string, payload: Partial<TCoures>) => {
  const { perRequisiteCourses, ...CouresRemeaninigData } = payload;
  const BasicUpdate = await Coures.findByIdAndUpdate(id, CouresRemeaninigData, {
    new: true,
    runValidators: true,
  });
  return BasicUpdate
};

const deleteCoures = async (id: string) => {
  const result = await Coures.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CouresService = {
  createCoures,
  getAllCoures,
  getSingleCoures,
  updateCorse,
  deleteCoures,
};
