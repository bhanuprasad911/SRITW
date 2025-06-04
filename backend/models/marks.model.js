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

  cie51s: [String],
  cie51m: [Number],

  cie52s: [String],
  cie52m: [Number],

  cie61s: [String],
  cie61m: [Number],

  cie62s: [String],
  cie62m: [Number],

  cie71s: [String],
  cie71m: [Number],

  cie72s: [String],
  cie72m: [Number],

  cie81s: [String],
  cie81m: [Number],

  cie82s: [String],
  cie82m: [Number],

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
  see8m: [Number],
});

const StudentMarks = mongoose.model("StudentMarks", StudentMarksSchema);
export default StudentMarks;
