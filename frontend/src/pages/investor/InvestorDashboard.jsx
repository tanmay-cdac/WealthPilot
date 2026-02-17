import { useNavigate } from "react-router-dom";
import InvestorNavbar from "../../components/InvestorNavbar";

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <InvestorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user?.fullName}!</h2>
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div onClick={() => navigate("/investor/create-request")} className="bg-blue-600 text-white p-6 rounded shadow cursor-pointer hover:bg-blue-700">
            <h3 className="text-xl font-bold">Create Request</h3>
            <p className="mt-2">Submit a new advisory request</p>
          </div>
          <div onClick={() => navigate("/investor/requests")} className="bg-green-600 text-white p-6 rounded shadow cursor-pointer hover:bg-green-700">
            <h3 className="text-xl font-bold">My Requests</h3>
            <p className="mt-2">View your advisory requests</p>
          </div>
          <div onClick={() => navigate("/investor/meetings")} className="bg-purple-600 text-white p-6 rounded shadow cursor-pointer hover:bg-purple-700">
            <h3 className="text-xl font-bold">My Meetings</h3>
            <p className="mt-2">View scheduled meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
