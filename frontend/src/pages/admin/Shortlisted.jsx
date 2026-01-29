import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import statusColor from "../../styles/statusColor";

const Shortlisted = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const fetchShortListed = async () => {
    try {
      const response = await api.get("/application/shortlisted-applicants");
      setApplications(response.data.resultData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchShortListed();
  }, []);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Shortlisted Candidates
        </h1>
        <p className="text-sm text-gray-500">
          Candidates selected for further interview rounds
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm  mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className=" rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        <select className=" rounded-lg px-4 py-2 text-sm">
          <option>Job Role</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
        </select>

        <select className=" rounded-lg px-4 py-2 text-sm">
          <option>Experience</option>
          <option>0–1 Years</option>
          <option>1–3 Years</option>
          <option>3+ Years</option>
        </select>

        <button className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700">
          Filter
        </button>
      </div>

      {/* Shortlisted Table */}
      <div className="bg-white rounded-xl shadow-sm  overflow-x-auto">
        {applications.length === 0 ? (
          <p className="text-center p-4">No shortlisted applicent present</p>
        ) : (
          <table className="w-full text-sm">
            <thead className=" bg-gray-50">
              <tr className="text-center text-gray-600">
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((e) => (
                <tr
                  key={e._id}
                  className="text-center odd:bg-white cursor-pointer  even:bg-gray-50 hover:bg-blue-50"
                  onClick={() => navigate(`/admin/user-profile/${e.user._id}`)}
                >
                  <td className="px-4 py-3 text-blue-700 font-bold">
                    {e?.job?.title}
                  </td>
                  <td className="px-4 py-3">{e?.user?.firstname}</td>
                  <td>{e?.user?.email}</td>
                  <td>{e?.user?.domain}</td>
                  {e?.user?.resume?.url ? (
                    <td
                      className="underline text-blue-600 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        window.open(
                          `https://docs.google.com/gview?url=${e?.user?.resume?.url}&embedded=true`,
                          "_blank",
                        );
                      }}
                    >
                      View
                    </td>
                  ) : (
                    <td>-</td>
                  )}

                  <td>{e?.user?.experience || "-"}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded ${statusColor[e?.status]}`}
                    >
                      {e?.status}
                    </span>
                  </td>
                  <td>
                    {new Date(e?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="text-green-600 hover:underline"
                      onClick={(event) => {
                        event.stopPropagation();
                        userStatusUpdate(e._id);
                      }}
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end gap-2">
        <button className="px-4 py-2  rounded-lg text-sm">Previous</button>
        <button className="px-4 py-2  rounded-lg text-sm bg-green-600 text-white">
          1
        </button>
        <button className="px-4 py-2  rounded-lg text-sm">Next</button>
      </div>
    </DashboardLayout>
  );
};

export default Shortlisted;
