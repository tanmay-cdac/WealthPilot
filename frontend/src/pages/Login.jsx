import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role.name;

      if (role === "ADMIN") navigate("/admin", { replace: true });
      else if (role === "INVESTOR") navigate("/investor", { replace: true });
      else if (role === "ADVISOR") navigate("/advisor", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">Login</h2>
        <p className="text-center text-gray-600">Welcome back! Please enter your credentials to access your account.</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-900 font-semibold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
