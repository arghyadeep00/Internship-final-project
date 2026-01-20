import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const appliedJobs = [
  {
    id: 1,
    title: "Analyst Trainee",
    company: "Cognizant",
    location: "PAN India",
    appliedOn: "10 Jan 2026",
    status: "Under Review",
  },
  {
    id: 2,
    title: "Graduate Engineer Trainee",
    company: "Capgemini",
    location: "Noida",
    appliedOn: "05 Jan 2026",
    status: "Shortlisted",
  },
  {
    id: 3,
    title: "WILP Program",
    company: "Wipro",
    location: "PAN India",
    appliedOn: "20 Dec 2025",
    status: "Applied",
  },
];

const statusColor = {
  Applied: "bg-blue-100 text-blue-600",
  "Under Review": "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-600",
};

const AppliedJobs = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Applied Jobs</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[15px] text-gray-900 border-b border-gray-300 robot">
              <tr>
                <th className="text-left p-4">Job Title</th>

                <th className="text-left p-4">Applied On</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {appliedJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-300 text-[16px] text-gray-700 last:border-0 roboto-flex"
                >
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">{job.appliedOn}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColor[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State (optional) */}
          {appliedJobs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              You haven’t applied to any jobs yet.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppliedJobs;
