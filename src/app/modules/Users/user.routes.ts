import express from 'express';
import { UserControllar } from './user.cotrollar';

const router = express.Router()


router.post('/', UserControllar.createUserDb) 