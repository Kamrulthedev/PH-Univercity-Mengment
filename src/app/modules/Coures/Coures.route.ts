import express from 'express';
import { CouresControllar } from './Coures.controllar';

const router = express.Router();


router.post('/create-course', CouresControllar.createCouresDb);

export const CouresRauter = router;