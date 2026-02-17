import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { getAllUsers, getAllRequests, getAllCompanies } from "../../api/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, requests: 0, companies: 0 });

  useEffect(() => {
    Promise.all([getAllUsers(), getAllRequests(), getAllCompanies()])
      .then(([users, requests, companies]) => {
        setStats({ users: users.data.length, requests: requests.data.length, companies: companies.data.length });
      });
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">{stats.users}</h3>
            <p className="mt-2">Total Users</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">{stats.requests}</h3>
            <p className="mt-2">Advisory Requests</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">{stats.companies}</h3>
            <p className="mt-2">Companies</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div onClick={() => navigate("/admin/users")} className="border p-6 rounded shadow cursor-pointer hover:bg-gray-50">
            <h3 className="text-xl font-bold">Manage Users</h3>
            <p className="mt-2 text-gray-600">View and manage all users</p>
          </div>
          <div onClick={() => navigate("/admin/requests")} className="border p-6 rounded shadow cursor-pointer hover:bg-gray-50">
            <h3 className="text-xl font-bold">Manage Requests</h3>
            <p className="mt-2 text-gray-600">Assign advisors to requests</p>
          </div>
          <div onClick={() => navigate("/admin/sectors")} className="border p-6 rounded shadow cursor-pointer hover:bg-gray-50">
            <h3 className="text-xl font-bold">Manage Sectors</h3>
            <p className="mt-2 text-gray-600">Add and edit sectors</p>
          </div>
          <div onClick={() => navigate("/admin/companies")} className="border p-6 rounded shadow cursor-pointer hover:bg-gray-50">
            <h3 className="text-xl font-bold">Manage Companies</h3>
            <p className="mt-2 text-gray-600">Add and edit companies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
