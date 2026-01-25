import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AdminGlobalContext = createContext();

export const AdminGlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [applications, setApplications] = useState([]);

  // fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/job/all-jobs");
      setJobs(response.data.resultData);
    } catch (error) {
      toast.error("Fetching job error");
    } finally {
      setLoading(false);
    }
  };

  // fetch applicants
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await api.get("/application/all-applicants");
      setApplicants(response.data.resultData);
    } catch (error) {
      toast.error("Fetching applicants error");
    } finally {
      setLoading(false);
    }
  };

  // fetch applications
  const fetchApplications = async () => {
    try {
      const response = await api.get("/application/applications");
      setApplications(response.data.resultData);
    } catch (error) {
      toast.error("Fetching applications error");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicants();
    fetchApplications();
  }, []);

  return (
    <AdminGlobalContext.Provider
      value={{
        jobs,
        setJobs,
        applications,
        applicants,
        setApplicants,
        fetchJobs,
        fetchApplicants,
        fetchApplications,
        loading,
      }}
    >
      {children}
    </AdminGlobalContext.Provider>
  );
};

export const useAdminGlobal = () => useContext(AdminGlobalContext);
