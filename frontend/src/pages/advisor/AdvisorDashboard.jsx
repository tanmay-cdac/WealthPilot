import { useNavigate } from "react-router-dom";
import AdvisorNavbar from "../../components/AdvisorNavbar";

export default function AdvisorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <AdvisorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user?.fullName}!</h2>
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div onClick={() => navigate("/advisor/requests")} className="bg-blue-600 text-white p-6 rounded shadow cursor-pointer hover:bg-blue-700">
            <h3 className="text-xl font-bold">Assigned Requests</h3>
            <p className="mt-2">View requests assigned to you</p>
          </div>
          <div onClick={() => navigate("/advisor/meetings")} className="bg-green-600 text-white p-6 rounded shadow cursor-pointer hover:bg-green-700">
            <h3 className="text-xl font-bold">My Meetings</h3>
            <p className="mt-2">View scheduled meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
