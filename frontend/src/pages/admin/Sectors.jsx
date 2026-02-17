import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getAllSectors, createSector, updateSector, deleteSector } from "../../api/api";

export default function Sectors() {
  const [sectors, setSectors] = useState([]);
  const [sectorName, setSectorName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const loadSectors = async () => {
    const res = await getAllSectors();
    setSectors(res.data);
  };

  useEffect(() => {
  const fetchSectors = async () => {
    await loadSectors();
  };

  fetchSectors();
}, []);


  const handleAdd = async () => {
    if (!sectorName.trim()) return;
    await createSector({ sectorName });
    setSectorName("");
    loadSectors();
  };

  const handleEdit = async (id) => {
    await updateSector(id, { sectorName: editValue });
    setEditingId(null);
    loadSectors();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sector?")) {
      await deleteSector(id);
      loadSectors();
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Sectors</h2>

        {/* Add Sector */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="New Sector Name"
            value={sectorName}
            onChange={(e) => setSectorName(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Sector Table */}
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Sector Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sectors.map((sec) => (
              <tr key={sec.sectorId}>
                <td className="border p-2">{sec.sectorId}</td>

                <td className="border p-2">
                  {editingId === sec.sectorId ? (
                    <input
                      value={editValue}
                      className="border p-1 rounded"
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    sec.sectorName
                  )}
                </td>

                <td className="border p-2 flex gap-2">
                  {editingId === sec.sectorId ? (
                    <>
                      <button
                        onClick={() => handleEdit(sec.sectorId)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(sec.sectorId);
                          setEditValue(sec.sectorName);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(sec.sectorId)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
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
