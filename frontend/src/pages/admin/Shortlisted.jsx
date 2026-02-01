import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import statusColor from "../../styles/statusColor";
import toast from 'react-hot-toast'

const Shortlisted = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [applicationId,setApplicationId]=useState(null);
  const fetchShortListed = async () => {
    try {
      const response = await api.get("/application/shortlisted-applicants");
      setApplications(response.data.resultData);
      console.log(response.data.resultData)
    } catch (error) { }
  };

  useEffect(() => {
    fetchShortListed();
  }, []);

  // interview box open
  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    mode: "",
    meetLink: "",
    notes: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setInterviewData({
      ...interviewData,
      [e.target.name]: e.target.value,
    });
  };

  const combineDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };


  const handleSubmit = async () => {
    try {
      const interviewDate = combineDateTime(
        interviewData.date,
        interviewData.time
      );

      const response = await api.post("/interview/schedule", {
        applicantId: userId,
        jobId,
        interviewDate,
        interviewData,
        applicationId
      });
      toast.success(response.data.message)
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };



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

                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((e, key) => (
                <tr
                  key={key}
                  className="text-center odd:bg-white cursor-pointer  even:bg-gray-50 hover:bg-blue-50"
                  onClick={() => navigate(`/admin/user-profile/${e.user._id}`)}
                >
                  <td className="px-4 py-3 text-blue-700 font-bold">
                    {e?.job?.title}
                  </td>
                  <td className="px-4 py-3">{e?.user?.firstname} {e?.user?.middlename} {e?.user?.lastname}</td>
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

                  <td>{e?.user?.experience} Year</td>
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
                        setShowModal(true)
                        setJobId(e?.job?._id)
                        setUserId(e?.user?._id)
                        setApplicationId(e?._id)
                      }}
                    >
                      Interview Date
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Card */}
            <div className="relative z-50 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Schedule Interview
                  </h2>
                  <p className="text-sm text-gray-500">
                    Set date, time and meeting details for the candidate
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={interviewData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 outline-none transition"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Interview Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={interviewData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 outline-none transition"
                  />
                </div>

                {/* Mode */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Interview Mode
                  </label>

                  <div className="flex gap-4">
                    {["Online", "Offline"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setInterviewData({ ...interviewData, mode: m })
                        }
                        className={`px-4 py-2 rounded-lg border transition ${interviewData.mode === m
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>


                {/* Meet Link (full width) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Google Meet Link
                  </label>
                  <input
                    type="url"
                    name="meetLink"
                    value={interviewData.meetLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/xyz-abc"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 outline-none transition"
                  />
                </div>

                {/* Notes (full width) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={interviewData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 outline-none transition resize-none"
                    placeholder="Add instructions or notes for the candidate..."
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
                >
                  Save Interview
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </DashboardLayout >
  );
};

export default Shortlisted;
