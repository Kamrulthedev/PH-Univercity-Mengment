import { z } from "zod";

const createAcademicDapermentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty Name must be String",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty Deperment must be String",
      required_error: "Faculty is required",
    }),
  }),
});

const updateWithAcademicUpdatevalidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty Name must be String",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty Deperment must be String",
      required_error: "Faculty is required",
    }),
  }),
});

export const AcademicDerpermentValidation = {
  createAcademicDapermentValidation,
  updateWithAcademicUpdatevalidation,
};
