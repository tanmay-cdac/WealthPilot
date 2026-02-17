import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdvisorNavbar from "../../components/AdvisorNavbar";
import { createMeeting } from "../../api/api";
import toast from "react-hot-toast";

export default function ScheduleMeeting() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scheduledDate: "",
    meetingLink: "",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMeeting(requestId, formData);
      toast.success("Meeting scheduled!");
      navigate("/advisor/meetings");
    } catch (err) {
      toast.error("Failed to schedule meeting");
    }
  };

  return (
    <>
      <AdvisorNavbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Schedule Meeting for Request #{requestId}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Scheduled Date & Time</label>
            <input type="datetime-local" required className="w-full border p-2 rounded" value={formData.scheduledDate} onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold mb-2">Meeting Link</label>
            <input type="url" className="w-full border p-2 rounded" placeholder="https://meet.google.com/..." value={formData.meetingLink} onChange={(e) => setFormData({...formData, meetingLink: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold mb-2">Notes</label>
            <textarea className="w-full border p-2 rounded" rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Schedule Meeting</button>
        </form>
      </div>
    </>
  );
}
