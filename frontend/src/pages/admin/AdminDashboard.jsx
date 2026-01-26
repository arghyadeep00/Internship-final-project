import DashboardLayout from "../../layouts/DashboardLayout";
import { Users, FileText, CheckCircle, XCircle } from "lucide-react";
import { useAdminGlobal } from "../../context/AdminContext";
import { useEffect } from "react";
import statusColor from "../../styles/statusColor";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { applicants, applications } = useAdminGlobal();
  const navigate = useNavigate();

  const lastFiveDaysData = applications
    .filter((item) => {
      const createdDate = new Date(item.createdAt);
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

      return createdDate >= fiveDaysAgo;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of candidate applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm bosm">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <h2 className="text-xl font-semibold">{applicants.length}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className="text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <h2 className="text-xl font-semibold">45</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Shortlisted</p>
              <h2 className="text-xl font-semibold">28</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <h2 className="text-xl font-semibold">12</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-300">
              <tr className="text-left text-gray-700 ">
                <th className="pb-3">Job Title</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Domin</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Apply Date</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {lastFiveDaysData.map((item) => (
                <tr
                  className="hover:bg-blue-50 cursor-pointer odd:bg-white even:bg-gray-50"
                  key={item._id}
                  onClick={() => navigate(`/admin/user-profile/${item.user._id}`)}
                >
                  <td className="py-3 text-blue-700 font-bold">
                    {item?.job?.title}
                  </td>
                  <td className="py-3">{item?.user?.firstname}</td>
                  <td>{item?.user?.domain}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded ${statusColor[item?.status]}`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td>
                    {new Date(item?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
