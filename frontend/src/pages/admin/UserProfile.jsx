import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const user = userData;
  const { id } = useParams();

  const fetchUser = async () => {
    const response = await api.get(`/admin/fetch-user/${id}`);
    setUserData(response.data.resultData);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);


  return (
    <DashboardLayout>
      {!user ? (
        <p>Loading....</p>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border"
            />

            <div>
              <h2 className="text-2xl font-semibold">
                {user.firstname} {user.middlename} {user.lastname}
              </h2>
              <p className="text-gray-600">{user.domain}</p>

              <div className="flex gap-3 mt-2">
                <Badge
                  text={user.role.toUpperCase()}
                  color="bg-purple-100 text-purple-700"
                />
                <Badge
                  text={
                    user.isEmailVerified
                      ? "Email Verified"
                      : "Email Not Verified"
                  }
                  color={
                    user.isEmailVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <Section title="Personal Information">
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone} />
            <Info label="Gender" value={user.gender} />
            <Info label="Location" value={user.location} />
            <Info
              label="Date of Birth"
              value={new Date(user?.dob).toLocaleDateString("en-IN")}
            />

            <Info label="Experience" value={`${user.experience} Years`} />
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="flex gap-2 flex-wrap">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            {user.education && user.education.length > 0 ? (
              user.education.map((edu, index) => (
                <div key={index} className=" rounded-lg p-4 space-y-1">
                  <p className="text-lg font-semibold">{edu.level}</p>

                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.board}</p>

                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).getFullYear()} –{" "}
                    {new Date(edu.endDate).getFullYear()}
                  </p>

                  <p className="text-sm font-medium">
                    Percentage:{" "}
                    <span className="text-blue-600">{edu.percentage}%</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education details available</p>
            )}
          </Section>

          {/* Documents */}
          <button
            onClick={() => window.open(user?.resume?.url, "_blank")}
            className="text-white px-5 py-2 bg-purple-500 rounded-md"
          >
            Resume
          </button>

          {/* Meta */}
          <div className="text-sm text-gray-500">
            Account created on{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN")}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Badge = ({ text, color }) => (
  <span className={`px-3 py-1 text-sm rounded ${color}`}>{text}</span>
);

export default UserProfile;
