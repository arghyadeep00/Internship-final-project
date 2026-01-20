import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const jobs = [
  {
    id: 1,
    title: "Cognizant fresher hiring for Analyst Trainee",
    company: "Cognizant",
    location: "PAN India",
    applied: true,
  },
  {
    id: 2,
    title: "Graduate Career Fair - Multiple Roles",
    company: "Superset Varsity",
    location: "Bangalore, Chennai",
    applied: true,
  },
];

const JobProfile = () => {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-80px)] gap-4">
        {/* LEFT PANEL – Job List */}
        <div className="w-1/3 max-h-[96%] rounded-lg bg-white overflow-y-auto shadow-xl">
          <div className="p-4 border-b border-gray-300 font-semibold text-lg">Open Jobs</div>

          {jobs.map((job) => (
            <div key={job.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-sm">{job.title}</h3>
              <p className="text-xs text-gray-500">
                {job.company} • {job.location}
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
        <div className="w-2/3 rounded-lg max-h-[96%] bg-white overflow-y-auto shadow-xl scroll-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold">
              Cognizant fresher hiring for Analyst Trainee
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Cognizant • PAN India • Full Time
            </p>

            <button className="mt-3 text-sm text-blue-600">
              Withdraw Application
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 px-6 text-sm font-medium">
            <button className="py-3 border-b-2 border-blue-600 text-blue-600 cursor-pointer">
              Job Description
            </button>
            <button className="py-3 text-gray-500 cursor-pointer">
              Hiring Workflow
            </button>
            <button className="py-3 text-gray-500 cursor-pointer">
              Eligibility Criteria
            </button>
            <button className="py-3 text-gray-500 cursor-pointer">
              Additional Questions
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-sm text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold">Opening Overview</h4>
              <p>
                Role aligned to IT & Integrated Smart Operations based on
                candidate credentials and performance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Job Responsibilities</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Perform database queries & CRUD operations</li>
                <li>Analyze and resolve service tickets</li>
                <li>Work with IT Service Management tools</li>
                <li>Support data analytics operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobProfile;
