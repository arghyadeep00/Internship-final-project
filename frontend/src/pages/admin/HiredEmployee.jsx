import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  
  useEffect(() => {
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
  }, []);

  const fetchEmployee = async()=>{
    try {
       
    } catch (error) {
      
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Hired Employees
        </h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Joined Date</th>            
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.phone}</td>
                  <td className="p-3">{emp.role}</td>
                  <td className="p-3">
                    {new Date(emp.joinedDate).toLocaleDateString()}
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
