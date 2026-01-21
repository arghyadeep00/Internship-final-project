import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./protected/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Shortlisted from "./pages/admin/Shortlisted";
import Interviews from "./pages/admin/Interviews";
import Hired from "./pages/admin/Hired";
import JobManagement from "./pages/admin/JobManagement";
import EmailTemplates from "./pages/admin/EmailTemplates";

import Profile from "./pages/user/Profile";
import LandingPage from "./pages/home/LandingPage";
import JobProfile from "./pages/user/JobProfile";
import AppliedJobs from "./pages/user/AppliedJobs";
import Settings from "./pages/user/Settings";
import PageNotFound from "./components/pageNotFound";
import Unauthorized from "./components/Unauthorized";
import Applications from "./pages/admin/Applications";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/applicant-register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected pages for applicant */}
        <Route
          path="user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
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

        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/applications"
          element={
            <ProtectedRoute role="admin">
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/shortlisted"
          element={
            <ProtectedRoute role="admin">
              <Shortlisted />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/interviews"
          element={
            <ProtectedRoute role="admin">
              <Interviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/hired"
          element={
            <ProtectedRoute role="admin">
              <Hired />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/job-management"
          element={
            <ProtectedRoute role="admin">
              <JobManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/email-templates"
          element={
            <ProtectedRoute role="admin">
              <EmailTemplates />
            </ProtectedRoute>
          }
        />
        
        {/* 404 page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
