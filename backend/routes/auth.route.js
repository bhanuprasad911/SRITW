import express from 'express'
import { login, me, signup } from '../controllers/authControllers.js';
import authMiddleWare from '../middlewares/authMiddleware.js';
const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/me', authMiddleWare, me)


export default authRouter;
