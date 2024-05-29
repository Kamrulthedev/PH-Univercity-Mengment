import {z} from 'zod';


const createAcademicFacultyValidation = z.object({
      name:z.string({invalid_type_error:"Academic Faculty Name must be String"})
});

export const AcademicFacultyValidation = {
    createAcademicFacultyValidation
};