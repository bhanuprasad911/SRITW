import mongoose from "mongoose";
import bcrypt from "bcrypt";
const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ["1", "2", "3", "4"],
      required: true,
    },
    sem: {
      type: String,
      enum: [
        "Sem-1",
        "Sem-2",
        "Sem-3",
        "Sem-4",
        "Sem-5",
        "Sem-6",
        "Sem-7",
        "Sem-8",
      ],
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Student",
      requied: true,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
