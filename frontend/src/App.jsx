import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InvestorDashboard from "./pages/investor/InvestorDashboard";
import AdvisorDashboard from "./pages/advisor/AdvisorDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Users from "./pages/admin/Users";
import Sectors from "./pages/admin/Sectors";
import Companies from "./pages/admin/Companies";
import Requests from "./pages/admin/Requests";
import ContactMessages from "./pages/admin/ContactMessages";
import CreateRequest from "./pages/investor/CreateRequest";
import MyRequests from "./pages/investor/MyRequests";
import Recommendations from "./pages/investor/Recommendations";
import Meetings from "./pages/investor/Meetings";
import AssignedRequests from "./pages/advisor/AssignedRequests";
import CreateRecommendation from "./pages/advisor/CreateRecommendation";
import ScheduleMeeting from "./pages/advisor/ScheduleMeeting";
import AdvisorMeetings from "./pages/advisor/AdvisorMeetings";

function AppWrapper() {
  const location = useLocation();

  // Routes where Header/Footer should be hidden
  const hideLayoutRoutes = ["/admin", "/investor", "/advisor"];

  const hideLayout = hideLayoutRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="ADMIN"><Users /></ProtectedRoute>}/>
          <Route path="/admin/sectors" element={<ProtectedRoute role="ADMIN"><Sectors /></ProtectedRoute>}/>
          <Route path="/admin/companies" element={<ProtectedRoute role="ADMIN"><Companies /></ProtectedRoute>}/>
          <Route path="/admin/requests" element={<ProtectedRoute role="ADMIN"><Requests /></ProtectedRoute>}/>
          <Route path="/admin/contacts" element={<ProtectedRoute role="ADMIN"><ContactMessages /></ProtectedRoute>}/>
          
          <Route path="/investor" element={<ProtectedRoute role="INVESTOR"><InvestorDashboard /></ProtectedRoute>} />
          <Route path="/investor/create-request" element={<ProtectedRoute role="INVESTOR"><CreateRequest /></ProtectedRoute>} />
          <Route path="/investor/requests" element={<ProtectedRoute role="INVESTOR"><MyRequests /></ProtectedRoute>} />
          <Route path="/investor/recommendations/:requestId" element={<ProtectedRoute role="INVESTOR"><Recommendations /></ProtectedRoute>} />
          <Route path="/investor/meetings" element={<ProtectedRoute role="INVESTOR"><Meetings /></ProtectedRoute>} />
          
          <Route path="/advisor" element={<ProtectedRoute role="ADVISOR"><AdvisorDashboard /></ProtectedRoute>} />
          <Route path="/advisor/requests" element={<ProtectedRoute role="ADVISOR"><AssignedRequests /></ProtectedRoute>} />
          <Route path="/advisor/recommend/:requestId" element={<ProtectedRoute role="ADVISOR"><CreateRecommendation /></ProtectedRoute>} />
          <Route path="/advisor/schedule-meeting/:requestId" element={<ProtectedRoute role="ADVISOR"><ScheduleMeeting /></ProtectedRoute>} />
          <Route path="/advisor/meetings" element={<ProtectedRoute role="ADVISOR"><AdvisorMeetings /></ProtectedRoute>} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
