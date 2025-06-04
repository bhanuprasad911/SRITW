import express from "express";
import { getAllStudents } from "../controllers/studentController.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getAllStudents);

export default studentRouter;
