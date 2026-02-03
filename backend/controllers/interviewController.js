import Interview from "../models/Interview.js";
import Application from "../models/Application.js"

export const interviewSchedule = async (req, res) => {
    try {
        const { applicantId, jobId, interviewDate, interviewData, applicationId } = req.body;
        
        // schedule save 
        await Interview.create({ applicant: applicantId, job: jobId, scheduledBy: req.user.id, interviewDate: interviewDate, mode: interviewData.mode, meetingLink: interviewData.meetLink, location: interviewData.location })

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

export const interviewDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const response = await Interview.find({ applicant: id }).populate("job", "title department jobType location").populate("applicant", "resume.url")
        return res.status(200).json({
            success: true,
            resultData: response
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "internal server error"
        })
    }
}