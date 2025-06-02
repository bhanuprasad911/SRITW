import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const studentSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        enum:['1', '2', '3', '4'],
        required:true
        
    },
    sem:{
        type:String,
        enum:['1', '2'],
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next(); 
});

const Student = mongoose.model('Student', studentSchema);
export default Student