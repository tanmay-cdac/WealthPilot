import { Link } from "react-router-dom";

export default function AdvisorNavbar() {
  return (
    <nav className="bg-purple-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 onClick={() => { localStorage.clear(); window.location.href="/"; }} className="font-bold text-xl cursor-pointer hover:text-yellow-300">WealthPilot</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:space-x-4">
        <Link to="/advisor" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/advisor/requests" className="hover:text-yellow-300">Assigned Requests</Link>
        <Link to="/advisor/meetings" className="hover:text-yellow-300">Meetings</Link>
        <button onClick={() => { localStorage.removeItem("token"); window.location.href="/login" }} className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
}
