import express from 'express';
import { CouresControllar } from './Coures.controllar';
import validationRequest from '../../milddlerwer/validate.Request';
import { CouresValidation } from './Coures.validation';

const router = express.Router();


router.post('/create-course',validationRequest(CouresValidation.CouresValidationSchema), CouresControllar.createCouresDb);

export const CouresRauter = router;