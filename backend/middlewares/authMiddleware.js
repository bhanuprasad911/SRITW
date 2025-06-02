import Student from "../models/Student.model.js";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, secret);
    const user = await Student.findOne({id:decoded.id}).select("-password");
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
