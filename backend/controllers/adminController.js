import Application from "../models/Application.js";

/* GET ALL APPLICATIONS */
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate(
      "user",
      "name email"
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE APPLICATION STATUS */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
