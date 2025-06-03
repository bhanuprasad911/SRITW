import StudentMarks from "../models/marks.model.js";

export const getMarksByStudent = async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const marks = await StudentMarks.find({studentId:user.id});
        res.status(200).json({message:"Marks fetched successfully", data:marks})
        
    } catch (error) {
        console.log('error in getting marks by student', error.message)
        return res.status(500).json({message: 'Internal Server Error'})
        
    }
}
export const getMarksByLecturer = async (req,res)=>{
    try {
        const {id} = req.params;
        const marks = await StudentMarks.find({lecturerId:id});
        if(!marks){
            return res.status(404).json({message:"No marks found"})
        }
        res.status(200).json({message:"Marks fetched successfully", data:marks})
        
    } catch (error) {
        console.log('error in getting marks by lecturer', error.message)
        
    }
}

export const addMarks = async (req, res) => {
  try {
    const { id, data } = req.body;

    const exist = await StudentMarks.findOne({ id });

    if (exist) {
      Object.keys(data).forEach(key => {
        exist[key] = data[key]; 
      });

      await exist.save();
      return res.status(200).json({ message: "Marks updated successfully" });
    } else {
      
      const newRecord = new StudentMarks({ id, ...data });
      await newRecord.save();
      return res.status(201).json({ message: "Marks added successfully" });
    }
  } catch (error) {
    console.error("Error while adding marks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
