import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
