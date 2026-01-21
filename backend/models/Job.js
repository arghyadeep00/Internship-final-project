import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
    },
    location: {
      type: String,
    },
    numberOfOpening: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [String],
    closingDate: {
      type: Date,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
