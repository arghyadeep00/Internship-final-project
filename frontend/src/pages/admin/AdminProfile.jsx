import { useAdminGlobal } from "../../context/AdminContext";
import DashboardLayout from "../../layouts/DashboardLayout";

const AdminProfile = () => {
  const { adminDetails } = useAdminGlobal();
 
  return (
    <DashboardLayout>
      <div className="p-6 max-w-8xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h1>

        {/* Profile Card */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {adminDetails?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {adminDetails.name}
            </h2>
            <p className="text-gray-500">{adminDetails.role}</p>
            <p className="text-sm text-gray-400">
              Joined on {new Date(adminDetails.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium text-gray-600">Email:</span>{" "}
                {adminDetails?.email}
              </p>
              <p>
                <span className="font-medium text-gray-600">Phone:</span>{" "}
                {adminDetails?.phone}
              </p>
              
            </div>
          </div>

          {/* Permissions / Role */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Admin Permissions</h3>

            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Post & manage jobs</li>
              <li>View applicants</li>
              <li>Approve / reject applications</li>
              <li>Manage users</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100">
            Change Password
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;
