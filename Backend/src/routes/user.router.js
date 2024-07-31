import express from 'express';
import { Home, loginUser, registerUser, updateUserById, user } from '../Controllers/userController.js';
// import LocalStrategy from ('passport-local').Strategy;
import passport from 'passport';
import { loginSchema, signupSchema } from '../validator/authValidator.js';
import validate from '../middleware/validateMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();




router.get("/" ,Home)
router.post('/signup',validate(signupSchema), registerUser);
router.post('/login', validate(loginSchema), passport.authenticate("local"), loginUser)
router.get('/userInfo',authMiddleware, user)

router.patch('/update', authMiddleware,updateUserById)


export default router

