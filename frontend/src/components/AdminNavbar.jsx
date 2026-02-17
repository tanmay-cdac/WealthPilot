import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 onClick={() => { localStorage.clear(); window.location.href="/"; }} className="font-bold text-xl cursor-pointer hover:text-yellow-300">WealthPilot</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:space-x-4"> 
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
        <Link to="/admin/requests" className="hover:text-yellow-300">Requests</Link>
        <Link to="/admin/sectors" className="hover:text-yellow-300">Sectors</Link>
        <Link to="/admin/companies" className="hover:text-yellow-300">Companies</Link>
        <Link to="/admin/contacts" className="hover:text-yellow-300">Contacts</Link>
        <button onClick={() => { localStorage.removeItem("token"); window.location.href="/login" }} className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
}
