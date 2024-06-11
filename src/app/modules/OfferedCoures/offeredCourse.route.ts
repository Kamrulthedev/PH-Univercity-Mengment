import express from 'express';
import { OfferedCurseControllar } from './offeredCourse.controllar';
import validationRequest from '../../milddlerwer/validate.Request';
import { offeredCouresValidation } from './offeredCoures.validation';


const router = express.Router();

router.post('/create-offerd-course',validationRequest(offeredCouresValidation.createOfferedCourseValidationSchema), OfferedCurseControllar.createOfferedCourseDb);

router.get('/', OfferedCurseControllar.GetAllOfferedCourseDb);

router.get('/:id',OfferedCurseControllar.GetSIngleOfferedCourseDb);

router.patch('/:id',validationRequest(offeredCouresValidation.updateOfferedCouresValidationSchema), OfferedCurseControllar.UpadateOfferedCourseDb);

export const OfferedCourseRoute = router;