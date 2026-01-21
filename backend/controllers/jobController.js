import Job from "../models/Job.js";

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
  } catch (error) {}
};
