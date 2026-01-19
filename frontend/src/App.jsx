import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./protected/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/user/Dashboard";

import Profile from "./pages/user/Profile";
import LandingPage from "./pages/home/LandingPage";
import JobProfile from "./pages/user/JobProfile";
import AppliedJobs from "./pages/user/AppliedJobs";
import Settings from "./pages/user/Settings";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/applicant-register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* protected pages for applicant */}
        <Route
          path="user/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/job-profile"
          element={
            <ProtectedRoute role="user">
              <JobProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/applied-jobs"
          element={
            <ProtectedRoute role="user">
              <AppliedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/settings"
          element={
            <ProtectedRoute role="user">
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* protected pages for admin */}
      </Routes>
    </div>
  );
};

export default App;
