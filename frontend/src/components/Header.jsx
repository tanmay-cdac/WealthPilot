import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4 px-6 gap-4">

        <h1 className="text-2xl font-bold text-white">
         WealthPilot
        </h1>

        <nav className="flex flex-wrap justify-center gap-4 sm:space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition-colors duration-200">About</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">Contact</Link>
          <Link to="/login" className="hover:text-yellow-300 font-semibold transition-colors duration-200">Login</Link>
          <Link to="/signup" className="hover:text-yellow-300 font-semibold transition-colors duration-200">Sign Up</Link>
        </nav>

      </div>
    </header>
  );
}
