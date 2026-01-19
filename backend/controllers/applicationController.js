import Application from "../models/Application.js";

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

/* GET MY APPLICATIONS */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
