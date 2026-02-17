import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");
        setUsers(res.data); // only set users once
      } catch (err) {
        console.error(err); 
        alert("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Compute filtered users dynamically
  const filteredUsers =
    roleFilter === "ALL" ? users : users.filter((u) => u.role.name === roleFilter);

  return (
    <>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>

        {/* Role Filter */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Role:</label>
          <select
            className="border p-2 rounded"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="ADMIN">Admin</option>
            <option value="INVESTOR">Investor</option>
            <option value="ADVISOR">Advisor</option>
          </select>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.userId}>
                <td className="border p-2">{u.userId}</td>
                <td className="border p-2">{u.fullName}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
