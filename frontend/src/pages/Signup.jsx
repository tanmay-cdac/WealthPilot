import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Signup() {
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        const user = JSON.parse(userStr);
        const role = user.role.name;
        if (role === "ADMIN") navigate("/admin", { replace: true });
        else if (role === "INVESTOR") navigate("/investor", { replace: true });
        else if (role === "ADVISOR") navigate("/advisor", { replace: true });
      }
    } catch (err) {
      localStorage.clear();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      role: role,
    };

    try {
      await registerUser(data);
      alert("Signup successful! Please login.");
      navigate("/login", { replace: true }); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">Create Account</h2>
        <p className="text-center text-gray-600">
          Join WealthPilot and start managing your investments efficiently.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input name="fullName" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="text" placeholder="Full Name" required />
          <input name="email" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="email" placeholder="Email" required />

          <select className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select Role</option>
            <option value="INVESTOR">Investor</option>
            <option value="ADVISOR">Advisor</option>
          </select>

          <input name="password" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="password" placeholder="Password" required />
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition">Sign Up</button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-900 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
