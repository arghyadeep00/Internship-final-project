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
    const response = await Application.find()
      .populate(
        "user",
        "firstname middlename lastname email phone domain skills resume",
      )
      .populate(
        "job",
        "title department jobType experience description skills closingDate createdAt",
      );

    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
