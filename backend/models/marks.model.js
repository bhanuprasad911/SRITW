import mongoose from "mongoose";

const StudentMarksSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },

  // CIEs
  cie11s: [String],
  cie11m: [Number],

  cie12s: [String],
  cie12m: [Number],

  cie21s: [String],
  cie21m: [Number],

  cie22s: [String],
  cie22m: [Number],

  cie31s: [String],
  cie31m: [Number],

  cie32s: [String],
  cie32m: [Number],

  cie41s: [String],
  cie41m: [Number],

  cie42s: [String],
  cie42m: [Number],

  // SEE Exams (for 8 semesters)
  see1s: [String],
  see1m: [Number],

  see2s: [String],
  see2m: [Number],

  see3s: [String],
  see3m: [Number],

  see4s: [String],
  see4m: [Number],

  see5s: [String],
  see5m: [Number],

  see6s: [String],
  see6m: [Number],

  see7s: [String],
  see7m: [Number],

  see8s: [String],
  see8m: [Number]
});

const StudentMarks = mongoose.model("StudentMarks", StudentMarksSchema);
export default StudentMarks;
