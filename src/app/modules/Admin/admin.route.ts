import express from 'express';
import { AdminControllar } from './admin.controllar';

const router = express.Router();


router.get('/', AdminControllar.getAllAdmin);

router.get('/:id', AdminControllar.getSingelAdmin);


export const AdminRouter = router;