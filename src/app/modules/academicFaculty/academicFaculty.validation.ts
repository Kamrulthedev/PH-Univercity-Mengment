import {z} from 'zod';


const createAcademicFacultyValidation = z.object({
    body:z.object({
        name:z.string({invalid_type_error:"Academic Faculty Name must be String"})
  })
});

const updateWithAcademicFacultyvalidation = z.object({
    body:z.object({
        name:z.string({invalid_type_error:"Academic Faculty Name must be String"})
    })
});

export const AcademicFacultyValidation = {
    createAcademicFacultyValidation,
    updateWithAcademicFacultyvalidation
};