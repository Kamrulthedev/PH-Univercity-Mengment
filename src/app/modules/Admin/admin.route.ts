import express from 'express';
import { AdminControllar } from './admin.controllar';

const router = express.Router();


router.get('/', AdminControllar.getAllAdmin);

router.get('/:id', AdminControllar.getSingelAdmin);

router.patch('/:id', AdminControllar.updateAdminDb);


export const AdminRouter = router;