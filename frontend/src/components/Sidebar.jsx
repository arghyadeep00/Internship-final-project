import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-6 text-xl font-bold text-blue-600">Applicant Panel</div>

      <nav className="px-4 space-y-2">
        {[
          { name: "Home", path: "/user/dashboard" },
          { name: "Job Profiles", path: "/user/job-profile" },
          { name: "Applied Jobs", path: "/user/applied-jobs" },
          { name: "My Profile", path: "/user/profile" },
          { name: "Settings", path: "/user/settings" },
        ].map((item) => (
          <NavLink
            key={item.name}      
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
