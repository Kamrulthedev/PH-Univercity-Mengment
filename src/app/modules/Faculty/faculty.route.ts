import express from 'express';
import { FacultyControllar } from './faculty.controllar';


const router = express.Router();

router.get('/', FacultyControllar.getAllFacutlyDb);

router.get('/:facultyId', FacultyControllar.getSingleFacultyDb);

export const FacultiesRoter = router;