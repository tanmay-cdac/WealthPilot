import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorNavbar from "../../components/AdvisorNavbar";
import { getAssignedRequests, approveRequest, declineRequest } from "../../api/api";
import toast from "react-hot-toast";

export default function AssignedRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    getAssignedRequests().then(res => setRequests(res.data)).catch(err => console.error(err));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      toast.success("Request approved");
      loadRequests();
    } catch (err) {
      toast.error("Failed to approve");
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineRequest(id);
      toast.success("Request declined");
      loadRequests();
    } catch (err) {
      toast.error("Failed to decline");
    }
  };

  return (
    <>
      <AdvisorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Assigned Requests</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Investor</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Risk</th>
              <th className="border p-2">Sector</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.requestId}>
                <td className="border p-2">{r.requestId}</td>
                <td className="border p-2">{r.investorId.fullName}</td>
                <td className="border p-2">₹{r.investmentAmount}</td>
                <td className="border p-2">{r.riskPreference}</td>
                <td className="border p-2">{r.sectorPreference}</td>
                <td className="border p-2">{r.description}</td>
                <td className="border p-2"><span className={`px-2 py-1 rounded text-white ${r.status === 'PENDING' ? 'bg-yellow-500' : 'bg-green-500'}`}>{r.status}</span></td>
                <td className="border p-2 space-x-2">
                  {r.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleApprove(r.requestId)} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                      <button onClick={() => handleDecline(r.requestId)} className="bg-red-600 text-white px-3 py-1 rounded">Decline</button>
                    </>
                  )}
                  {r.status === 'ASSIGNED' && (
                    <>
                      <button onClick={() => navigate(`/advisor/recommend/${r.requestId}`)} className="bg-blue-600 text-white px-3 py-1 rounded">Recommend</button>
                      <button onClick={() => navigate(`/advisor/schedule-meeting/${r.requestId}`)} className="bg-green-600 text-white px-3 py-1 rounded">Schedule</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
