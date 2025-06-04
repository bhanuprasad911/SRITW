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

export const 

 addMarks = async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log("Received Data:", req.body);

    let exist = await StudentMarks.findOne({ id });

    if (exist) {
      Object.keys(data).forEach(key => {
        const isSubjectList = key.endsWith('s');
        const isMarksList = key.endsWith('m');

        const relatedKey = isSubjectList
          ? key.slice(0, -1) + 'm'
          : key.slice(0, -1) + 's';

        const value = data[key][0]; // single value array like ['Data Structures'] or [15]

        // Check if the subject exists and update its corresponding mark
        if (isSubjectList) {
          if (!exist[key]) exist[key] = [];
          if (!exist[relatedKey]) exist[relatedKey] = [];

          const subjectIndex = exist[key].indexOf(value);
          if (subjectIndex !== -1) {
            // subject exists – no need to reinsert
            // you can skip or modify the subject name if needed
          } else {
            exist[key].push(value); // add new subject
            exist[relatedKey].push(data[relatedKey][0]); // add corresponding mark
          }
        } else if (isMarksList) {
          // skip because marks are handled with subject
        }
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


