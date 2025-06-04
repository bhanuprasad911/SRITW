import Admin from "../models/Admin.model.js";
import Lecturer from "../models/Lecturer.model.js";
import Student from "../models/Student.model.js";

import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

const authMiddleWare = async (req, res, next) => {
  try {
    console.log(req.cookies.token)
    const token = req.cookies.token;
    console.log(Boolean(token))
    if (!token) {return res.status(401).json({ message: "Unauthorized" });}
    const decoded = jwt.verify(token, secret);
    const {id,type} = decoded;
   
    let user = null;

    if (type === 'admin') {
      user = await Admin.findOne({ id }).select("-password");
    } else if (type === 'lecturer') {
      user = await Lecturer.findOne({ id }).select("-password");
    } else if (type === 'student') {
      user = await Student.findOne({ id }).select("-password");
    }
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
};
export default authMiddleWare;
