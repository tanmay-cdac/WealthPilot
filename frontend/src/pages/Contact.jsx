import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter } from "react-icons/fa";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

return ( <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-6 md:px-16">


  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">Contact Us</h2>
  
  <p className="mt-4 text-gray-700 text-lg text-center max-w-3xl">
    At WealthPilot, we value your feedback and inquiries. Whether you have questions about our
    investment solutions, need support with your account, or want to explore partnership opportunities,
    our team is here to help. Fill out the form below and we’ll get back to you promptly.
  </p>

  <div className="mt-12 w-full max-w-4xl grid md:grid-cols-2 gap-10">
    

    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-start space-y-6">
      <h3 className="text-2xl font-semibold text-blue-800">Our Office</h3>
      <p className="text-gray-700 flex items-center gap-3"><FaMapMarkerAlt className="text-blue-600" /> 123 Finance Avenue, Suite 500, Mumbai, Maharashtra, India</p>
      <p className="text-gray-700 flex items-center gap-3"><FaPhone className="text-blue-600" /> +91-9876543210</p>
      <p className="text-gray-700 flex items-center gap-3"><FaEnvelope className="text-blue-600" /> support@wealthpilot.com</p>

      <div className="flex space-x-4 mt-4">
        <a href="#" className="text-blue-600 hover:text-blue-800"><FaLinkedin size={24} /></a>
        <a href="#" className="text-blue-600 hover:text-blue-800"><FaTwitter size={24} /></a>
      </div>
    </div>

  
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <input 
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        type="text" 
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input 
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        type="email" 
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        type="text" 
        placeholder="Subject"
        required
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
      />
      <textarea 
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        rows="5" 
        placeholder="Message"
        required
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      ></textarea>
      <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold hover:bg-blue-800 transition">
        Submit
      </button>
    </form>

  </div>
</div>


);
}
