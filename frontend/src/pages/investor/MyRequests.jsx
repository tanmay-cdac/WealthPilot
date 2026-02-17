import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvestorNavbar from "../../components/InvestorNavbar";
import { getMyRequests } from "../../api/api";

export default function MyRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getMyRequests().then(res => setRequests(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <>
      <InvestorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">My Advisory Requests</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Risk</th>
              <th className="border p-2">Sector</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Advisor</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.requestId}>
                <td className="border p-2">{r.requestId}</td>
                <td className="border p-2">₹{r.investmentAmount}</td>
                <td className="border p-2">{r.riskPreference}</td>
                <td className="border p-2">{r.sectorPreference}</td>
                <td className="border p-2"><span className={`px-2 py-1 rounded text-white ${r.status === 'OPEN' ? 'bg-yellow-500' : 'bg-green-500'}`}>{r.status}</span></td>
                <td className="border p-2">{r.advisorId?.fullName || "Not Assigned"}</td>
                <td className="border p-2">
                  <button onClick={() => navigate(`/investor/recommendations/${r.requestId}`)} className="bg-blue-600 text-white px-3 py-1 rounded">Company Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
