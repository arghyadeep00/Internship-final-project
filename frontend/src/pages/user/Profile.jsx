import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { SquarePen } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your personal information and resume
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 flex items-center gap-6 shadow">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-semibold text-blue-600">
            AS
          </div>

          <div className="flex-1 roboto">
            <h2 className="text-lg font-semibold">Arghyadeep Shee</h2>
            <p className="text-sm text-gray-500">BCA Student • 2025 Graduate</p>
            <p className="text-sm text-gray-500">arghyadeep@gmail.com</p>
          </div>

          <div className="px-4 py-2 cursor-pointer text-gray-600 ">
            <SquarePen />
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between text-xl">
              <h3 className="font-semibold mb-4">Personal Details</h3>
              <div className="px-4 py-2 cursor-pointer text-gray-600 ">
                <SquarePen />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>+91 9XXXXXXXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gender</span>
                <span>Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between text-xl">
              <h3 className="font-semibold mb-4">Education</h3>
              <div className="px-4 py-2 cursor-pointer text-gray-600 ">
                <SquarePen />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">
                Bachelor of Computer Applications (BCA)
              </p>
              <p className="text-gray-500">XYZ University</p>
              <p className="text-gray-500">2022 – 2025</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between">
          <h3 className="font-semibold mb-4 text-xl">Skills</h3>
          <div className="px-4 py-2 cursor-pointer text-gray-600 ">
            <SquarePen />
          </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Express",
              "JavaScript",
              "HTML",
              "CSS",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xl">Resume</h3>
            <p className="text-sm text-gray-500">
              Upload or update your resume
            </p>
          </div>

          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer">
            Upload Resume
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
