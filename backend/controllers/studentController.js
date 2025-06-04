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
export const getStudentById = async (req, res) =>{
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId).select('-password');
        if(!student) return res.status(404).json({message: "Student not found"});
        return res.status(200).json(student);
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error fetching student"});
    }
    }
