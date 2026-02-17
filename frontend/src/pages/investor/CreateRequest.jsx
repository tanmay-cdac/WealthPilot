import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvestorNavbar from "../../components/InvestorNavbar";
import { createAdvisoryRequest, getAllSectors } from "../../api/api";
import toast from "react-hot-toast";

export default function CreateRequest() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [formData, setFormData] = useState({
    investmentAmount: "",
    riskPreference: "",
    sectorPreference: "",
    description: ""
  });

  useEffect(() => {
    getAllSectors()
      .then(res => {
        console.log('Sectors loaded:', res.data);
        setSectors(res.data);
      })
      .catch(err => {
        console.error('Error loading sectors:', err);
        toast.error('Failed to load sectors');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdvisoryRequest(formData);
      toast.success("Request created successfully!");
      navigate("/investor/requests");
    } catch (err) {
      toast.error("Failed to create request");
    }
  };

  return (
    <>
      <InvestorNavbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Create Advisory Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Investment Amount</label>
            <input type="number" required className="w-full border p-2 rounded" value={formData.investmentAmount} onChange={(e) => setFormData({...formData, investmentAmount: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold mb-2">Risk Preference</label>
            <select required className="w-full border p-2 rounded" value={formData.riskPreference} onChange={(e) => setFormData({...formData, riskPreference: e.target.value})}>
              <option value="">Select Risk Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Sector Preference</label>
            <select required className="w-full border p-2 rounded" value={formData.sectorPreference} onChange={(e) => setFormData({...formData, sectorPreference: e.target.value})}>
              <option value="">Select Sector</option>
              {sectors.map(s => <option key={s.sectorId} value={s.sectorName}>{s.sectorName}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea required className="w-full border p-2 rounded" rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Submit Request</button>
        </form>
      </div>
    </>
  );
}
