import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdvisorNavbar from "../../components/AdvisorNavbar";
import { createRecommendation, getAllCompanies } from "../../api/api";
import toast from "react-hot-toast";

export default function CreateRecommendation() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyId: "",
    notes: "",
    expectedReturn: ""
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data)).catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('requestId', requestId);
      data.append('companyId', formData.companyId);
      data.append('notes', formData.notes);
      data.append('expectedReturn', formData.expectedReturn);
      if (file) data.append('file', file);
      
      await createRecommendation(data);
      toast.success("Recommendation created!");
      navigate("/advisor/requests");
    } catch (err) {
      toast.error("Failed to create recommendation");
    }
  };

  return (
    <>
      <AdvisorNavbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Create Recommendation for Request #{requestId}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Select Company</label>
            <select required className="w-full border p-2 rounded" value={formData.companyId} onChange={(e) => setFormData({...formData, companyId: e.target.value})}>
              <option value="">Choose a company</option>
              {companies.map(c => <option key={c.companyId} value={c.companyId}>{c.name} - {c.sector?.sectorName}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Expected Return</label>
            <input type="text" required className="w-full border p-2 rounded" placeholder="e.g., 12-15%" value={formData.expectedReturn} onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold mb-2">Notes</label>
            <textarea required className="w-full border p-2 rounded" rows="4" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold mb-2">Company Financial Report (PDF)</label>
            <input type="file" accept=".pdf" className="w-full border p-2 rounded" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Submit Recommendation</button>
        </form>
      </div>
    </>
  );
}
