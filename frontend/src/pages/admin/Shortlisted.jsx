import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const Shortlisted = () => {
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
        <table className="w-full text-sm">
          <thead className=" bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Interview Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="">
              <td className="px-4 py-3">Ananya Das</td>
              <td>ananya@gmail.com</td>
              <td>Frontend Developer</td>
              <td>2 Years</td>
              <td>25 Jan 2026</td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Shortlisted
                </span>
              </td>
              <td className="space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-purple-600 hover:underline">
                  Schedule
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3">Rohit Verma</td>
              <td>rohit@gmail.com</td>
              <td>Backend Developer</td>
              <td>3 Years</td>
              <td>27 Jan 2026</td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Shortlisted
                </span>
              </td>
              <td className="space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-purple-600 hover:underline">
                  Schedule
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end gap-2">
        <button className="px-4 py-2  rounded-lg text-sm">
          Previous
        </button>
        <button className="px-4 py-2  rounded-lg text-sm bg-green-600 text-white">
          1
        </button>
        <button className="px-4 py-2  rounded-lg text-sm">
          Next
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Shortlisted;
