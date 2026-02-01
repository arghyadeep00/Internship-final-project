import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const UserGlobalContext = createContext();

export const UserGlobalProvider = ({ children }) => {
  const [appliedJobs, setappliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplyJobs = async () => {
    setLoading(true);
    const response = await api.get("/job/fetch-applied-jobs");
    setappliedJobs(response.data.resultData);
    setLoading(false);
  };
  useEffect(() => {
    fetchApplyJobs();
  }, []);
  return (
    <UserGlobalContext.Provider
      value={{ appliedJobs, loading, setLoading, fetchApplyJobs }}
    >
      {children}
    </UserGlobalContext.Provider>
  );
};

export const useUserGlobal = () => useContext(UserGlobalContext);
