import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  // 🔹 Fetch from backend later
  useEffect(() => {
    // Example dummy data (replace with API)
    setEmployees([
      {
        _id: "1",
        name: "Arjun Sharma",
        email: "arjun@gmail.com",
        phone: "+91 9876543210",
        role: "Frontend Developer",
        joinedDate: "2026-01-20",
      },
      {
        _id: "2",
        name: "Riya Das",
        email: "riya@gmail.com",
        phone: "+91 9123456780",
        role: "Backend Developer",
        joinedDate: "2026-01-18",
      },
    ]);

    // Later:
    // axios.get("/api/employee/hired").then(res => setEmployees(res.data))
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Hired Employees
        </h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.phone}</td>
                  <td className="p-3">{emp.role}</td>
                  <td className="p-3">
                    {new Date(emp.joinedDate).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">
                      View
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded text-xs">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-400">
                    No hired employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employee;
