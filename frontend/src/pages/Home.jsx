import { Link } from "react-router-dom";
import { FaChartLine, FaShieldAlt, FaCog } from "react-icons/fa";
import image from "../assets/image.png";

export default function Home() {
  return (
    <div className="bg-gray-50">

    
      <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to WealthPilot</h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 px-4">
            Simplifying wealth management and investment advisory solutions.
          </p>
          <Link
            to="/signup"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

    
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">Our Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCog className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy Management</h3>
              <p className="text-gray-600">Streamline your workflows and keep everything organized efficiently.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-Time Analytics</h3>
              <p className="text-gray-600">Monitor progress and performance with intuitive dashboards and reports.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Data</h3>
              <p className="text-gray-600">All your information is encrypted and stored safely with backup options.</p>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:flex md:items-center md:gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={image}
              alt="WealthPilot"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About WealthPilot</h2>
            <p className="mb-4">
              WealthPilot is committed to providing cutting-edge management solutions for businesses and organizations. Our platform is intuitive, secure, and designed to help you manage operations seamlessly.
            </p>
            <Link
              to="/about"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

     
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic mb-4">"WealthPilot has completely transformed the way we run our operations. Highly recommended!"</p>
              <h3 className="font-semibold">Sumit Mote</h3>
              <p className="text-sm text-gray-500">CEO, Dolly ChaiWala</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic mb-4">"The dashboards are intuitive and give me real-time insights into our projects."</p>
              <h3 className="font-semibold">Tanmay Sawant</h3>
              <p className="text-sm text-gray-500">Project Manager,HomeShop18</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic mb-4">"I love how secure and organized everything is. It saves me so much time."</p>
              <h3 className="font-semibold">Parikshit Urkande</h3>
              <p className="text-sm text-gray-500">Operations Head, Naaptol</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 px-4">Ready to Get Started?</h2>
        <p className="mb-6 px-4">Sign up now and experience the difference with WealthPilot.</p>
        <Link
          to="/signup"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Sign Up
        </Link>
      </section>

    </div>
  );
}
