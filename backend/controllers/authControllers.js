import Student from "../models/Student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export const signup = async (req, res) => {
  try {
    const { id, name, branch, year, sem, batch, password } = req.body;
    const exist = await Student.findOne({ id });
    if (exist) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const student = new Student({ id, name, branch, year, sem, batch, password });
    const result = await student.save();
    res
      .status(201)
      .json({ message: "Student created successfully", data: result });
  } catch (error) {
    console.log("Error while signing up user");
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    // 1. Find student by ID
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign({ id: student.id }, secret, {
      expiresIn: "1h",
    });

    // 4. Set token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Logged in successfully",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });

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
        return res.status(500).json({message: 'Internal Server Error'})

  }
};
