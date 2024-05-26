import express from 'express';

const router = express.Router()

router.post('/create-student', UserControllars.createStudent) 


export const UserRouotes = router;