import Student from "../models/Student.model.js";

export const getAllStudents = async (req, res) =>{
    try {
        const students = await Student.find().select('-password');
        return res.status(200).json(students);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Error fetching students"});
        
    }
}
