import DashboardLayout from "../../layouts/DashboardLayout";
import { useAdminGlobal } from "../../context/AdminContext";
import { useEffect } from "react";
import { File } from "lucide-react";

const Applications = () => {
  const { applications } = useAdminGlobal();
  useEffect(() => {
    console.log(applications);
  }, [applications]);
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Applications</h1>
        <p className="text-sm text-gray-500">
          Manage and review all candidate applications
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm  mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500"
        />

        <select className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500">
          <option>Status</option>
          <option>Pending</option>
          <option>Shortlisted</option>
          <option>Interview Scheduled</option>
          <option>Rejected</option>
        </select>

        <select className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500">
          <option>Job Role</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
        </select>

        <button className="bg-purple-600 font-semibold text-white px-5 py-2 rounded-lg text-sm hover:bg-purple-700">
          Filter
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm  overflow-x-auto">
        {applications.length == 0 ? (
          <div className="text-center p-4">No applicant present</div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className=" bg-gray-50">
              <tr className="text-center text-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Domin</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((e) => (
                <tr key={e._id} className="text-center odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                  <td className="px-4 py-3">{e?.user?.firstname}</td>
                  <td>{e?.user?.email}</td>
                  <td>{e?.user?.domain}</td>
                  <td
                    className="underline text-blue-600 cursor-pointer"
                    onClick={() => window.open(e?.user?.resume, "_blank")}
                  >
                    View
                  </td>
                  <td>{e?.user?.experience || "-"}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
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
                    <button className="text-green-600 hover:underline">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination (Optional) */}
      <div className="mt-6 flex justify-end gap-2">
        <button className="px-4 py-2  rounded-lg text-sm">Previous</button>
        <button className="px-4 py-2  rounded-lg text-sm bg-blue-600 text-white">
          1
        </button>
        <button className="px-4 py-2  rounded-lg text-sm">Next</button>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
