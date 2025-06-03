import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
        id:{
            type:String,
            required:true,
            unique:true
        },
        type:{
          type:String,
          required:true
        },
        password:{
            type:String,
            required:true
        }
},{
    timestamps:true
}
)
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
const Admin = mongoose.model('Admin', adminSchema)
export default Admin;