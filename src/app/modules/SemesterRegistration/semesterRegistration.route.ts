
import express from 'express';
import { SemesterRegistrationControllar } from './semsterRegistration.controllar';
import validationRequest from '../../milddlerwer/validate.Request';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post('/',validationRequest(SemesterRegistrationValidation.createsemesterRegistrationValidationSchema), SemesterRegistrationControllar.createSemesterRegistrationDb);

router.get('/', SemesterRegistrationControllar.getAllSemesterRegistrationDb);

router.get('/', SemesterRegistrationControllar.getSingleSemesterRegistationDb);

router.patch('/', SemesterRegistrationControllar.updateSemesterRegistaionDb);

export const SemesterRegistrationRouter = router;