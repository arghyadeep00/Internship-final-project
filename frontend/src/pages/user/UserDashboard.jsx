import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useUserGlobal } from "../../context/UserContext";
const UserDashboard = () => {

  const { appliedJobs } = useUserGlobal();


  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ===== Applications Table ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">My Applications</h2>

          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Role</th>
                <th className="p-3">Company</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applied On</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {
                appliedJobs?.filter(e => ["Pending", "Shortlisted", "Scheduled"].includes(e?.status)).map((e, key) => (
                  <tr className=" hover:bg-gray-50" key={key}>
                    <td className="p-3">{e?.job?.department}</td>
                    <td className="p-3">Veridia</td>
                    <td className="p-3 text-yellow-500 font-medium">{e?.status}</td>
                    <td className="p-3">{new Date(e?.createdAt).toDateString()}</td>
                    <td className="p-3">
                      <button className="text-blue-600 underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* ===== Selected Application Details UI ===== */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Interview Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4 text-gray-700">
              Interview Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Date:</strong> 25 Jan 2026</p>
              <p><strong>Time:</strong> 11:00 AM</p>
              <p className="text-blue-600 underline cursor-pointer">
                Join Google Meet
              </p>
            </div>
          </div>

          {/* Application Info Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4 text-gray-700">
              Application Info
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Role:</strong> Frontend Intern</p>
              <p><strong>Status:</strong> Interview Scheduled</p>
              <p><strong>Resume:</strong> <span className="text-blue-600">View</span></p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
