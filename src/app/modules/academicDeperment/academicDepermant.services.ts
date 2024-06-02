import TAcademicDeperment from "./academicDeperment.interface";
import { AcademicDeperment } from "./academicDeperment.model";

const createAcademicDerperment = async (payload: TAcademicDeperment) => {
  const result = await AcademicDeperment.create(payload);
  return result;
};

const GetallAcademicDeperment = async () => {
  const result = await AcademicDeperment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDeperment = async (id: string) => {
  const result = await AcademicDeperment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDeperment = async (
  id: string,
  payload: Partial<TAcademicDeperment>
) => {
  const result = await AcademicDeperment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicDepermentService = {
  createAcademicDerperment,
  getSingleAcademicDeperment,
  GetallAcademicDeperment,
  updateAcademicDeperment,
};
