import express from 'express';
import { CouresControllar } from './Coures.controllar';
import validationRequest from '../../milddlerwer/validate.Request';
import { CouresValidation } from './Coures.validation';

const router = express.Router();


router.post('/create-course',validationRequest(CouresValidation.CouresValidationSchema), CouresControllar.createCouresDb);

router.get('/', CouresControllar.getAllCouresDb);

router.get('/:id', CouresControllar.getSingleCouresDb);

router.delete('/:id', CouresControllar.deleteCouresDb);

router.patch('/:id',validationRequest(CouresValidation.UpdateCouresValidationSchema), CouresControllar.updateCorseDb)

export const CouresRauter = router;