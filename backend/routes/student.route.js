import express from 'express'
import { getAllStudents } from '../controllers/studentController.js'
import authMiddleWare from '../middlewares/authMiddleware.js'
const studentRouter = express.Router()

studentRouter.get('/', authMiddleWare, getAllStudents)

export default studentRouter