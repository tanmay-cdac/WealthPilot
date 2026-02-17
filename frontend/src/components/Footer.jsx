import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-sm">

      
        <div>
          <h2 className="font-semibold mb-2">WealthPilot</h2>
          <p>123 Main Street, City, State 12345</p>
          <p>Email: info@wealthpilot.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>

        
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link></li>
            <li><Link to="/login" className="hover:text-yellow-300 transition-colors">Login</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-300 transition-colors">Sign Up</Link></li>
          </ul>
        </div>


        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-3 text-lg">
            <a href="#" className="hover:text-yellow-300 transition-colors">📘</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">🐦</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">💼</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">📸</a>
          </div>
        </div>

      </div>

      <div className="mt-4 text-center text-xs text-white/80">
        © {new Date().getFullYear()} WealthPilot. All Rights Reserved.
      </div>
    </footer>
  );
}
