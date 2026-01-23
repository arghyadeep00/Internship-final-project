import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import toast from "react-hot-toast";

const JobProfile = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/job/all-jobs");
      setJobs(response.data.resultData);

      // auto-select first job
      if (response.data.resultData.length > 0) {
        setSelectedJob(response.data.resultData[0]);
      }
    } catch (error) {
      toast.error("Fetching job error");
    } finally {
      setLoading(false);
    }
  };
  const applyJob = async (id) => {
    try {
      const response = await api.post("/job/apply-job", { id });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Can't post job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-80px)] gap-4">
        {/* LEFT PANEL – Job List */}
        <div className="w-1/3 rounded-lg bg-white overflow-y-auto shadow-xl">
          <div className="p-4 border-b border-gray-300 font-semibold text-lg">
            Open Jobs
          </div>

          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => setSelectedJob(job)}
              className={`p-4 cursor-pointer
                ${selectedJob?._id === job._id ? "bg-blue-50" : "hover:bg-gray-50"}
              `}
            >
              <div className="flex justify-between">
                {" "}
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  Published:{" "}
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}{" "}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {job.jobType} • {job.location}
              </p>

              {job.applied && (
                <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  Applied
                </span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL – Job Details */}
        <div className="w-2/3 rounded-lg bg-white overflow-y-auto shadow-xl">
          {!selectedJob ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a job to view details
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-gray-300 flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedJob.company} • {selectedJob.location} •{" "}
                    {selectedJob.jobType}
                  </p>
                </div>

                <div className="text-sm text-red-500">
                  Closing:{" "}
                  {selectedJob.closingDate
                    ? new Date(selectedJob.closingDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : ""}{" "}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-between px-6 text-sm font-medium">
                <div className="flex gap-6">
                  <button className="py-3 border-b-2 border-blue-600 text-blue-600">
                    Job Description
                  </button>
                  <button className="py-3 text-gray-500">
                    Hiring Workflow
                  </button>
                  <button className="py-3 text-gray-500">
                    Eligibility Criteria
                  </button>
                </div>
                <div className="px-3 py-2 mt-3 rounded bg-purple-500 font-semibold text-white hover:bg-purple-600">
                  <button onClick={() => applyJob(selectedJob._id)}>
                    Apply now
                  </button>
                </div>
              </div>

              {/* Job Description */}
              <div className="p-6 text-sm text-gray-700 space-y-4">
                <div>
                  <h4 className="font-semibold">Job Description</h4>
                  <p>
                    {selectedJob.description || "No description available."}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Required skills</h4>
                  <p>{selectedJob.skills || "No description available."}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Responsibilities</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {selectedJob.responsibilities?.length > 0 ? (
                      selectedJob.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No responsibilities listed</li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobProfile;
