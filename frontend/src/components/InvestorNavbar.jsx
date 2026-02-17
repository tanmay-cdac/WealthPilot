import { Link } from "react-router-dom";

export default function InvestorNavbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 onClick={() => { localStorage.clear(); window.location.href="/"; }} className="font-bold text-xl cursor-pointer hover:text-yellow-300">WealthPilot</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:space-x-4">
        <Link to="/investor" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/investor/create-request" className="hover:text-yellow-300">Create Request</Link>
        <Link to="/investor/requests" className="hover:text-yellow-300">My Requests</Link>
        <Link to="/investor/meetings" className="hover:text-yellow-300">Meetings</Link>
        <button onClick={() => { localStorage.removeItem("token"); window.location.href="/login" }} className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
}
