import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../api/api";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/contact").then(res => setMessages(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.contactId}>
                <td className="border p-2">{m.contactId}</td>
                <td className="border p-2">{m.name}</td>
                <td className="border p-2">{m.email}</td>
                <td className="border p-2">{m.subject}</td>
                <td className="border p-2">{m.message}</td>
                <td className="border p-2">{new Date(m.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
