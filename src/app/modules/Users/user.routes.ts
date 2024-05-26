import express from 'express';
import { UserControllar } from './user.cotrollar';

const router = express.Router()

router.post('/create-student', UserControllar.createStudent) 


export const UserRouotes = router;