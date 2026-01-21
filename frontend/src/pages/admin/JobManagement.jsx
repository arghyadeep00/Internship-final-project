import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

const JobManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  // post new job
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/job/post-job", data);
      reset()
      toast.success(response.data.message);
    } catch (error) {}
  };
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Job Management
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage job postings
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 flex items-center gap-1 text-white px-5 py-2 rounded-lg text-sm hover:bg-purple-700 cursor-pointer font-semibold"
        >
          <Plus className="w-5" /> Add New Job
        </button>
      </div>

      {/* Add Job Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Create Job Post</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <input
                  type="text"
                  placeholder="Job title"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 
                    ${
                      errors.jobtitle
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  {...register("jobtitle", {
                    required: "Job title is required",
                  })}
                />
                {errors.jobtitle && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.jobtitle.message}
                  </p>
                )}
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Department"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500 "
                  {...register("department")}
                />
              </div>
              <div>
                <select
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                    errors.jobtype
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                  {...register("jobtype", {
                    required: "Please select job type",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Job type
                  </option>
                  <option value="fulltime">Full time</option>
                  <option value="parttime">Part time</option>
                  <option value="remote">Remote</option>
                </select>
                {errors.jobtype && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.jobtype.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Experience 2+ year"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                    errors.experience
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                  {...register("experience", {
                    required: "Experice is is required",
                  })}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Location"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 
                    ${
                      errors.jobtitle
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  {...register("location", { required: "Location is require" })}
                />
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Number of openings"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500 "
                  {...register("openingjobs")}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 gap-1">
              <label
                htmlFor="closingDate"
                className="text-sm flex w-full font-medium text-gray-500"
              >
                Closing Date
                <input
                  type="date"
                  id="closingDate"
                  name="closingDate"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("closingdate")}
                />{" "}
              </label>
            </div>

            <textarea
              rows="4"
              placeholder="Job Description"
              className="w-full mt-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500"
              {...register("jobdescription", {
                required: "Job description is required",
              })}
            ></textarea>
            {errors.jobdescription && (
              <p className="text-sm text-red-500 mt-1">
                {errors.jobdescription.message}
              </p>
            )}
            <textarea
              rows="3"
              placeholder="Required Skills (comma separated)"
              className="w-full mt-3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 border-gray-200 focus:ring-purple-500 focus:border-purple-500"
              {...register("skills", {
                required: "Skills are is required",
              })}
            ></textarea>
            {errors.skills && (
              <p className="text-sm text-red-500 mt-1">
                {errors.skills.message}
              </p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="border px-5 py-2 font-semibold rounded-lg text-sm border-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-green-700 cursor-pointer"
              >
                Publish Job
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Job Listings */}
      <div className="bg-white rounded-md shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-300 bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Openings</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="px-4 py-3">Frontend Developer</td>
              <td>Engineering</td>
              <td>Full Time</td>
              <td>Remote</td>
              <td>3</td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Close</button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3">Backend Developer</td>
              <td>Engineering</td>
              <td>Internship</td>
              <td>Bangalore</td>
              <td>2</td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                  Closed
                </span>
              </td>
              <td className="space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-green-600 hover:underline">Open</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default JobManagement;
