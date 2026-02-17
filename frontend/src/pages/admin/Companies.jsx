import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getAllSectors,
} from "../../api/api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [name, setName] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");

  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    const compRes = await getAllCompanies();
    const secRes = await getAllSectors();
    setCompanies(compRes.data);
    setSectors(secRes.data);
  };

  useEffect(() => {
  const fetchData = async () => {
    await loadData();
  };
  fetchData();
  }, []);


  const resetForm = () => {
    setName("");
    setMarketCap("");
    setDescription("");
    setRiskLevel("");
    setSector("");
  };

  const handleSave = async () => {
    const companyData = {
      name,
      marketCap,
      description,
      riskLevel,
      sector: { sectorId: sector },
    };

    if (editingId) {
      await updateCompany(editingId, companyData);
    } else {
      await createCompany(companyData);
    }

    resetForm();
    setEditingId(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete company?")) {
      await deleteCompany(id);
      loadData();
    }
  };

  const startEdit = (c) => {
    setEditingId(c.companyId);
    setName(c.name);
    setDescription(c.description);
    setRiskLevel(c.riskLevel);
    setMarketCap(c.marketCap);
    setSector(c.sector?.sectorId || "");
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Companies</h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Market Cap"
            type="number"
            value={marketCap}
            onChange={(e) => setMarketCap(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
          >
            <option value="">Select Risk Level</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          <select
            className="border p-2 rounded"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">Select Sector</option>
            {sectors.map((s) => (
              <option key={s.sectorId} value={s.sectorId}>
                {s.sectorName}
              </option>
            ))}
          </select>

          <textarea
            className="border rounded p-2 col-span-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
          >
            {editingId ? "Update" : "Add Company"}
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border mt-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Sector</th>
              <th className="border p-2">Risk</th>
              <th className="border p-2">Market Cap</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr key={c.companyId}>
                <td className="border p-2">{c.companyId}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.sector?.sectorName}</td>
                <td className="border p-2">{c.riskLevel}</td>
                <td className="border p-2">{c.marketCap}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.companyId)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
