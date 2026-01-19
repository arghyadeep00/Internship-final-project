import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from '../../components/StatCard'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Application Status"
          value="Under Review"
          color="text-yellow-500"
        />
        <StatCard
          title="Applied Role"
          value="Frontend Intern"
          color="text-blue-600"
        />
        <StatCard
          title="Applied On"
          value="12 Jan 2026"
          color="text-gray-800"
        />
        <StatCard
          title="Last Update"
          value="HR Screening"
          color="text-green-600"
        />
      </div>

      {/* Timeline / Details */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Application Timeline
        </h2>

        <ul className="space-y-3">
          <li>✔ Application Submitted</li>
          <li>✔ HR Screening</li>
          <li>⏳ Technical Review</li>
          <li>⏳ Interview</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
