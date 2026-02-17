import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getAllRequests, getAllUsers, assignAdvisor } from "../../api/api";
import toast from "react-hot-toast";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const loadData = async () => {
    const reqRes = await getAllRequests();
    const userRes = await getAllUsers();
    setRequests(reqRes.data);
    setAdvisors(userRes.data.filter(u => u.role.name === "ADVISOR"));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignDirect = async (requestId, advisorId) => {
    try {
      console.log('Assigning request', requestId, 'to advisor', advisorId);
      const response = await assignAdvisor(requestId, advisorId);
      console.log('Assignment response:', response.data);
      toast.success("Request sent to advisor for approval");
      loadData();
    } catch (err) {
      console.error('Assignment error:', err);
      toast.error("Failed to assign advisor");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">All Advisory Requests</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Investor</th>
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
                <td className="border p-2">{r.investorId.fullName}</td>
                <td className="border p-2">₹{r.investmentAmount}</td>
                <td className="border p-2">{r.riskPreference}</td>
                <td className="border p-2">{r.sectorPreference}</td>
                <td className="border p-2"><span className={`px-2 py-1 rounded text-white ${r.status === 'OPEN' ? 'bg-yellow-500' : 'bg-green-500'}`}>{r.status}</span></td>
                <td className="border p-2">{r.advisorId?.fullName || "Not Assigned"}</td>
                <td className="border p-2">
                  {(r.status === 'OPEN' || (r.status === 'PENDING' && !r.advisorId)) && (
                    <select onChange={(e) => e.target.value && handleAssignDirect(r.requestId, e.target.value)} className="border p-2 rounded" defaultValue="">
                      <option value="">Assign to Advisor</option>
                      {advisors.map(a => <option key={a.userId} value={a.userId}>{a.fullName}</option>)}
                    </select>
                  )}
                  {r.status === 'PENDING' && r.advisorId && <span className="text-yellow-600">Pending Approval</span>}
                  {r.status === 'ASSIGNED' && <span className="text-green-600">Assigned</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </>
  );
}
