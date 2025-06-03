import express from 'express'
import authMiddleWare from '../middlewares/authMiddleware.js'
import { getMarksByLecturer, getMarksByStudent } from '../controllers/marksController.js'
const marksRouter = express.Router()

marksRouter.get('/', authMiddleWare, getMarksByStudent)
marksRouter.get('/:id', getMarksByLecturer)






export default marksRouter