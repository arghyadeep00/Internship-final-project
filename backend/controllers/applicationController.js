import Application from "../models/Application.js";
import User from "../models/User.js";
/* SUBMIT APPLICATION */
export const submitApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all applicants
export const allApplicants = async (req, res) => {
  try {
    const response = await User.find({}, "-password");
    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// all applications
export const applications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalApplications = await Application.countDocuments();

    const applications = await Application.find()
      .populate(
        "user",
        "firstname middlename lastname email phone domain skills resume experience",
      )
      .populate(
        "job",
        "title department jobType experience description skills closingDate createdAt",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      totalApplications,
      currentPage: page,
      totalPages: Math.ceil(totalApplications / limit),
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, applicationId } = req.body;
    await Application.findByIdAndUpdate(applicationId, { status });
    return res.status(200).json({
      success: true,
      message: "status update success",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
