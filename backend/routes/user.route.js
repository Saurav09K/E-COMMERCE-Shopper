import express from 'express';
import {login, register,adminLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/admin', adminLogin);


export default router;