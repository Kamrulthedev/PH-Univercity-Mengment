import express from 'express';
import { FacultyControllar } from './faculty.controllar';


const router = express.Router();

router.get('/:facultyId', FacultyControllar.getSingleFacultyDb);

router.get('/', FacultyControllar.getAllFacutlyDb);

export const FacultiesRoter = router;