import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [String],
    location: String,
    type: {
      type: String,
      enum: ["Internship", "Full-time"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
