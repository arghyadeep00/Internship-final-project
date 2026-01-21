import Job from "../models/Job.js";

// function for new job post
export const postJob = async (req, res) => {
  const {
    jobtitle,
    department,
    jobtype,
    experience,
    location,
    openingjobs,
    closingdate,
    jobdescription,
    skills,
  } = req.body;
  try {
    // check require fields
    if (
      !jobtitle ||
      !jobtype ||
      !experience ||
      !location ||
      !jobdescription ||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message: "Requre this fileds",
      });
    }
    // store data in db
    await Job.create({
      title: jobtitle,
      department: department,
      jobType: jobtype,
      experience: experience,
      location: location,
      numberOfOpening: openingjobs,
      description: jobdescription,
      skills: skills,
      closingDate: closingdate,
      postedBy: req.user.id,
    });

    // final and send response to user
    return res.status(201).json({
      success: true,
      message: "Job post successfylly",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// fetch all posted jobs

export const allJobs = async (req, res) => {
  try {
    const resultData = await Job.find({});
    return res.status(200).json({
      success: true,
      resultData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
