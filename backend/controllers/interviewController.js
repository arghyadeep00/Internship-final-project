import Interview from "../models/Interview.js";
import Application from "../models/Application.js"

export const interviewSchedule = async (req, res) => {
    try {
        const { applicantId, jobId, interviewDate, interviewData, applicationId } = req.body;

        // schedule save 
        await Interview.create({ applicant: applicantId, job: jobId, scheduledBy: req.user.id, interviewDate: interviewDate, mode: interviewData.mode, meetingLink: interviewData.meetLink, })

        // status change application collection
        await Application.findByIdAndUpdate(applicationId, { status: "Scheduled" })
        return res.status(200).json({
            success: true,
            message: "Schedule confirmed"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messagel: "internal server error"
        })
    }
}