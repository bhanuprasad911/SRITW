import Student from "../models/Student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";
import Lecturer from "../models/Lecturer.model.js";
const secret = process.env.SECRET;

export const signup = async (req, res) => {
  try {
    const { id, type, data } = req.body;
    if (type === "student") {
      const exist = await Student.findOne({ id });
      if (exist) {
        return res.status(400).json({ message: "Student already exists" });
      }
      const student = new Student({
        id,
        type,
        name: data.name,
        branch: data.branch,
        year: data.year,
        sem: data.sem,
        batch: data.batch,
        password: data.password,
      });
      const result = await student.save();
      res
        .status(201)
        .json({ message: "Student created successfully", data: result });
    } else if (type === "admin") {
      const exist = await Admin.findOne({ id });
      if (exist) {
        return res.status(400).json({ message: "Admin already exists" });
      }
      const admin = new Admin({
        id,
        type,
        name: data.name,
        password: data.password,
      });
      const result = await admin.save();
      res
        .status(201)
        .json({ message: "Admin created successfully", data: result });
    } else if (type === "lecturer") {
      const exist = await Lecturer.findOne({ id });
      if (exist) {
        return res.status(400).json({ message: "Lecturer already exists" });
      }
      const lecturer = new Lecturer({
        id,
        type,
        name: data.name,
        subjects: data.subjects,
        password: data.password,
      });
      const result = await lecturer.save();
      res
        .status(201)
        .json({ message: "Lecturer created successfully", data: result });
    }
    else {
  return res.status(400).json({ message: "Invalid user type" });
}
  } catch (error) {
    console.log("Error while signing up user");
    console.log(error.message);
  }
};



export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const admin = await Admin.findOne({ id });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: admin.id, type: admin.type }, secret, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });
      return res
        .status(200)
        .json({ message: "Admin logged in successfully", data: admin });
    }
    const lecturer = await Lecturer.findOne({ id });
    if (lecturer) {
      const isMatch = await bcrypt.compare(password, lecturer.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: lecturer.id, type: lecturer.type }, secret, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });
      return res
        .status(200)
        .json({ message: "Lecturer logged in successfully", data: lecturer });
    }
    const student = await Student.findOne({ id });
    if (student) {
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: student.id, type: student.type }, secret, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });
      return res
        .status(200)
        .json({ message: "Student logged in successfully", data: student });
    }
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error while logging in user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.log("Error while getting user");
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
