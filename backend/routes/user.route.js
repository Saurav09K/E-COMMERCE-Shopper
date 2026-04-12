import express from 'express';
import {login, register,adminlogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/adminlogin', adminlogin);


export default router;