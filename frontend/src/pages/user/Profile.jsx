import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { SquarePen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
import { Brain } from "lucide-react";
import { School } from "lucide-react";
import { toast } from "react-hot-toast";
import { File } from "lucide-react";
import api from "../../services/api";

const Profile = () => {
  const { user, fetchApplicants } = useAuth();

  // for open edit forms
  const [editProfile, setEditProfile] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editEducation, setEducation] = useState(false);

  // for forms
  const [profileForm, setProfileForm] = useState({});
  const [personalForm, setPersonalForm] = useState({});
  const [skillsForm, setSkillsForm] = useState("");
  const [educationForm, setEducationForm] = useState({});

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstname: user.firstname || "",
        middlename: user.middlename || "",
        lastname: user.lastname || "",
      });

      setPersonalForm({
        phone: user.phone || "",
        gender: user.gender || "",
        location: user.location || "",
      });

      setSkillsForm({ skills: user.skills?.join(", ") || "" });

      setEducationForm(
        user.education || {
          level: "",
          institution: "",
          board: "",
          startDate: "",
          endDate: "",
          percentage: "",
        },
      );
    }
  }, [user]);

  const handleProfileSave = async () => {
    const payload = profileForm;

    const res = await api.put("/user/profile", payload);
    toast.success(res.data.message);
    fetchApplicants();

    setEditProfile(false);
  };

  const handlePersonalSave = async () => {
    const payload = personalForm;
    const res = await api.put("/user/personal", payload);
    toast.success(res.data.message);
    setEditPersonal(false);
  };

  const handleSkillsSave = async () => {
    const payload = skillsForm;

    const res = await api.put("/user/skills", payload);
    toast.success(res.data.message);
    setEditSkills(false);
  };

  const handleEducationSave = async () => {
    const payload = {
      ...educationForm,
      startDate: educationForm.startDate
        ? new Date(educationForm.startDate)
        : null,
      endDate: educationForm.endDate ? new Date(educationForm.endDate) : null,
    };

    const res = await api.put("/user/education", payload);
    toast.success(res.data.message);

    setEducation(false);
  };
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 relative">
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
            <h2 className="text-lg font-semibold text-gray-700">
              {[user?.firstname, user?.middlename, user?.lastname]
                .filter(Boolean)
                .join(" ")}
            </h2>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div
            className="px-4 py-2 cursor-pointer text-gray-600"
            onClick={() => setEditProfile(true)}
          >
            <SquarePen />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between text-xl">
              <h3 className="font-semibold mb-4">
                {" "}
                <div className="flex gap-2 text-gray-700">
                  <User />
                  Personal Details
                </div>
              </h3>
              <div
                className="px-4 py-2 cursor-pointer text-gray-600"
                onClick={() => setEditPersonal(true)}
              >
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
                <span>
                  {" "}
                  {user?.gender
                    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span>{user?.location}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between">
              <h3 className="font-semibold mb-4 text-xl">
                <div className="flex gap-2 text-gray-700">
                  {" "}
                  <Brain /> Skills
                </div>
              </h3>
              <div
                className="px-4 py-2 cursor-pointer text-gray-600"
                onClick={() => setEditSkills(true)}
              >
                <SquarePen />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill) => (
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
              <div className="flex gap-2 text-gray-700">
                <School />
                Education
              </div>
            </h3>
            <div
              className="px-4 py-2 cursor-pointer text-gray-600 "
              onClick={() => setEducation(true)}
            >
              <SquarePen />
            </div>
          </div>
          {user?.education?.map((e) => (
            <div className="space-y-2 mt-3 border p-2 rounded border-gray-100 shadow" key={e.level}>
              <p className="font-medium">{e.level}</p>
              <div className="flex justify-between">
                <p className="font-medium">{e.board}</p>
                <p className="text-gray-500">Marks: {e.percentage}%</p>
              </div>
              <p className="text-gray-500">{e.institution}</p>
              <p className="text-gray-500">
                {e?.startDate || e?.endDate
                  ? `${new Date(e?.startDate).getFullYear()} - ${new Date(e?.endDate).getFullYear()}`
                  : ""}
              </p>
            </div>
          ))}
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

      {/* edit profile section (name) */}
      {editProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditProfile(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Edit Profile
            </h2>

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="First Name"
                value={profileForm.firstname}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, firstname: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Middle Name"
                value={profileForm.middlename}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, middlename: e.target.value })
                }
              />

              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Last Name"
                value={profileForm.lastname}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lastname: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditProfile(false);
                  handleProfileSave();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit personal details */}
      {editPersonal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditPersonal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Edit Personal Details
            </h2>

            <div className="space-y-3">
              {/* mobile number */}
              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Phone number"
                value={personalForm.phone}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, phone: e.target.value })
                }
              />
              {/* gender */}
              <select
                name="gender"
                id="gender"
                value={personalForm.gender || ""}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, gender: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {/* location */}
              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Location e.g Kolkata"
                value={personalForm.location}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, location: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditPersonal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  (setEditPersonal(false), handlePersonalSave());
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* skills details */}
      {editSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditSkills(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Edit Skills
            </h2>

            <div className="space-y-3">
              {/* Skills */}
              <input
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="React, Javascript"
                value={skillsForm.skills}
                onChange={(e) =>
                  setSkillsForm({ ...skillsForm, skills: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditSkills(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditSkills(false);
                  handleSkillsSave();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* education details */}
      {editEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEducation(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Edit Education
            </h2>

            <div className="space-y-3">
              {/* Level */}
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={educationForm.level}
                onChange={(e) =>
                  setEducationForm({ ...educationForm, level: e.target.value })
                }
              >
                <option value="">Select Level</option>
                <option value="Class X">Class X</option>
                <option value="Class XII">Class XII</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>

              {/* Institution */}
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Institution / College Name"
                value={educationForm.institution}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    institution: e.target.value,
                  })
                }
              />

              {/* Board / University */}
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Board / University"
                value={educationForm.board}
                onChange={(e) =>
                  setEducationForm({ ...educationForm, board: e.target.value })
                }
              />

              {/* Start Date */}
              <label
                htmlFor=""
                className="px-3 text-sm font-semibold text-gray-700"
              >
                Start date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={educationForm.startDate}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    startDate: e.target.value,
                  })
                }
              />

              {/* End Date */}
              <label
                htmlFor=""
                className="px-3 text-sm font-semibold text-gray-700"
              >
                End date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={educationForm.endDate}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    endDate: e.target.value,
                  })
                }
              />

              {/* Percentage */}
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Percentage"
                value={educationForm.percentage}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    percentage: e.target.value,
                  })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEducation(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setEducation(false);
                  handleEducationSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
