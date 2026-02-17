import { useState, useEffect } from "react";
import AdvisorNavbar from "../../components/AdvisorNavbar";
import { getMeetingsByAdvisor, updateMeetingStatus, updateInvestmentDecision } from "../../api/api";
import toast from "react-hot-toast";

export default function AdvisorMeetings() {
  const [meetings, setMeetings] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const loadMeetings = () => {
    getMeetingsByAdvisor(userId).then(res => setMeetings(res.data)).catch(err => console.error(err));
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const handleComplete = async (meetingId) => {
    try {
      await updateMeetingStatus(meetingId, 'COMPLETED');
      toast.success("Meeting marked as completed");
      loadMeetings();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDecision = async (meetingId, decision) => {
    try {
      await updateInvestmentDecision(meetingId, decision);
      toast.success(`Marked as ${decision}`);
      loadMeetings();
    } catch (err) {
      toast.error("Failed to update decision");
    }
  };

  const hasActions = meetings.some(m => m.status === 'CONFIRMED' || (m.status === 'COMPLETED' && !m.investmentDecision));

  return (
    <>
      <AdvisorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">My Meetings</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Investor</th>
              <th className="border p-2">Scheduled Date</th>
              <th className="border p-2">Meeting Link</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Investment</th>
              {hasActions && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {meetings.map(m => (
              <tr key={m.meetingId}>
                <td className="border p-2">{m.meetingId}</td>
                <td className="border p-2">{m.investor.fullName}</td>
                <td className="border p-2">{new Date(m.scheduledDate).toLocaleString()}</td>
                <td className="border p-2">{m.meetingLink ? <a href={m.meetingLink} target="_blank" className="text-blue-600 underline">Join</a> : "N/A"}</td>
                <td className="border p-2"><span className={`px-2 py-1 rounded text-white ${m.status === 'PENDING' ? 'bg-yellow-500' : m.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-gray-500'}`}>{m.status}</span></td>
                <td className="border p-2">
                  {m.investmentDecision ? (
                    <span className={`px-2 py-1 rounded text-white ${m.investmentDecision === 'INVESTED' ? 'bg-green-600' : 'bg-red-600'}`}>{m.investmentDecision}</span>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
                {hasActions && (
                  <td className="border p-2 space-x-2">
                    {m.status === 'CONFIRMED' && (
                      <button onClick={() => handleComplete(m.meetingId)} className="bg-blue-600 text-white px-3 py-1 rounded">Mark Complete</button>
                    )}
                    {m.status === 'COMPLETED' && !m.investmentDecision && (
                      <>
                        <button onClick={() => handleDecision(m.meetingId, 'INVESTED')} className="bg-green-600 text-white px-3 py-1 rounded">Invested</button>
                        <button onClick={() => handleDecision(m.meetingId, 'NOT_INVESTED')} className="bg-red-600 text-white px-3 py-1 rounded">Not Invested</button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
