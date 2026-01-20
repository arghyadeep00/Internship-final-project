import { NavLink } from "react-router-dom";
import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { FileUser } from "lucide-react";
import { UserPen } from "lucide-react";
import { Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-6 text-xl font-bold text-blue-600">Applicant Panel</div>

      <nav className="px-4 space-y-2">
        {[
          { icon: <House />, name: "Home", path: "/user/dashboard" },
          {
            icon: <BriefcaseBusiness />,
            name: "Job Profiles",
            path: "/user/job-profile",
          },
          {
            icon: <FileUser />,
            name: "Applied Jobs",
            path: "/user/applied-jobs",
          },
          { icon: <UserPen />, name: "My Profile", path: "/user/profile" },
          { icon: <Settings />, name: "Settings", path: "/user/settings" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center gap-3 font-semibold ${
                isActive
                  ? "bg-purple-100 text-purple-600"
                  : "hover:bg-gray-100 text-gray-500"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
