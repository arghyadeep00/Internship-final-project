import Application from "../models/Application.js";
import User from "../models/User.js";
import transporter from "../services/nodemailer.js";
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
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background-color:#f2f4f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid #e5e7eb;">
          
          <tr>
            <td align="center" style="background:#111827;padding:20px;color:#ffffff;">
              <h2 style="margin:0;font-size:22px;">Veridia.io</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;color:#333333;font-size:15px;line-height:1.6;">
              <p>Dear <strong>Name</strong>,</p>

              <p>
                We are pleased to inform you that you have been <strong>selected for an Internship at Veridia.io</strong>.
                Your performance during the selection process impressed our team.
              </p>

              <p>
                Our HR team will contact you shortly with onboarding details, joining date,
                and required documentation.
              </p>

              <p>
                We look forward to working with you.
              </p>

              <p style="margin-top:20px;">
                Best Regards,<br/>
                <strong>HR Team</strong><br/>
                Veridia.io
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="background:#f9fafb;padding:15px;font-size:12px;color:#6b7280;">
              © 2026 Veridia.io. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const { status, applicationId, email } = req.body;

    //update status application collection
    await Application.findByIdAndUpdate(applicationId, { status });
    //send email to user
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "Congratulations! You’ve Been Selected for an Internship at Veridia",
      html: htmlTemplate,
    });

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

export const searchApplication = async (req, res) => {
  try {
    const { search, status, domain } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    let userMatch = {};

    if (search) {
      userMatch.$or = [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (domain) {
      userMatch.domain = domain;
    }
    let applications = await Application.find(query)
      .populate({
        path: "user",
        match: userMatch,
        select:
          "firstname middlename lastname email phone domain skills experience resume",
      })
      .populate(
        "job",
        "title department jobType experience description skills closingDate createdAt",
      )
      .sort({ createdAt: -1 });
    applications = applications.filter((app) => app.user !== null);

    res.status(200).json({
      success: true,
      total: applications.length,
      resultData: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};

export const recentApplications = async (req, res) => {
  try {
    // Get date of 5 days ago
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const applications = await Application.find({
      createdAt: { $gte: fiveDaysAgo },
    })
      .populate(
        "user",
        "firstname middlename lastname email phone domain skills experience resume",
      )
      .populate(
        "job",
        "title department jobType experience description skills closingDate createdAt",
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: applications.length,
      resultData: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch last 5 days applications",
      error: error.message,
    });
  }
};

export const totalApplications = async (req, res) => {
  try {
    const response = await Application.countDocuments({});
    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const pending = async (req, res) => {
  try {
    const response = await Application.countDocuments({ status: "Pending" });
    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
export const shortListed = async (req, res) => {
  try {
    const response = await Application.countDocuments({
      status: "Shortlisted",
    });
    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
export const rejected = async (req, res) => {
  try {
    const response = await Application.countDocuments({ status: "Rejected" });
    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const shortlistedApplicants = async (req, res) => {
  try {
    const response = await Application.find({ status: "Shortlisted" })
      .populate(
        "user",
        "firstname middlename lastname email phone domain skills experience resume",
      )
      .populate(
        "job",
        "title department jobType experience description skills closingDate createdAt",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      resultData: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
