import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { SquarePen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
import { Brain } from "lucide-react";
import { School } from "lucide-react";
import { File } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

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
          <img
            src={user.avatar || "/user.png"}
            alt="profile"
            className="rounded-full w-18 h-18 cursor-pointer"
          />

          <div className="flex-1 roboto">
            <h2 className="text-lg font-semibold">
              {[user?.firstname, user?.middlename, user?.lastname]
                .filter(Boolean)
                .join(" ")}
            </h2>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="px-4 py-2 cursor-pointer text-gray-600 ">
            <SquarePen />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between text-xl">
              <h3 className="font-semibold mb-4">
                {" "}
                <div className="flex gap-2 ">
                  <User className="text-gray-800" />
                  Personal Details
                </div>
              </h3>
              <div className="px-4 py-2 cursor-pointer text-gray-600 ">
                <SquarePen />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{user?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gender</span>
                <span>{user?.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span>{user?.country}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between">
              <h3 className="font-semibold mb-4 text-xl">
                <div className="flex gap-2">
                  {" "}
                  <Brain className="text-gray-800" /> Skills
                </div>
              </h3>
              <div className="px-4 py-2 cursor-pointer text-gray-600 ">
                <SquarePen />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between text-xl">
            <h3 className="font-semibold mb-4">
              <div className="flex gap-2">
                <School className="text-gray-800" />
                Education
              </div>
            </h3>
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

        {/* Resume */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xl">
              <div className="flex gap-2 text-gray-800">
                {" "}
                <File />
                Resume
              </div>
            </h3>
            <p className="text-sm text-gray-500">
              Upload or update your resume
            </p>
          </div>

          <div className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer">
            Preview Resume
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
