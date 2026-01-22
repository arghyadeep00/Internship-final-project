import User from "../models/User.js";

export const avatar = async (req, res) => {
  try {
  } catch (error) {
    return req
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const profile = async (req, res) => {
  try {
    const { firstname, middlename, lastname } = req.body;
    console.log(middlename);
    const updateFields = {};

    if (firstname !== undefined) updateFields.firstname = firstname;
    if (middlename !== undefined) updateFields.middlename = middlename;
    if (lastname !== undefined) updateFields.lastname = lastname;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const personal = async (req, res) => {
  try {
    const { phone, gender, location } = req.body;
    const updateFields = {};
    console.log(location);
    if (phone !== undefined) updateFields.phone = phone;
    if (gender !== undefined) updateFields.gender = gender;
    if (location !== undefined) updateFields.location = location;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const skills = async (req, res) => {
  try {
    const { skills } = req.body;
    const updateFields = {};
    updateFields.skills = skills;
    console.log(skills);
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const education = async (req, res) => {
  try {
    const { board, endDate, institution, level, percentage, startDate } =
      req.body;

    const updateFields = {};

    if (board !== undefined) updateFields.board = board;
    if (endDate !== undefined) updateFields.endDate = endDate;
    if (institution !== undefined) updateFields.institution = institution;
    if (level !== undefined) updateFields.level = level;
    if (percentage !== undefined) updateFields.percentage = percentage;
    if (startDate !== undefined) updateFields.startDate = startDate;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { education: updateFields } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const resume = async (req, res) => {
  try {
  } catch (error) {
    return req
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
