
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Investor pages
import InvestorDashboard from "./pages/investor/Dashboard";
import ExploreStartups from "./pages/investor/ExploreStartups";
import StartupDetails from "./pages/investor/StartupDetails";
import Analysis from "./pages/investor/Analysis";
import Saved from "./pages/investor/Saved";

// Startup pages
import StartupDashboard from "./pages/startup/Dashboard";
import ExploreInvestors from "./pages/startup/ExploreInvestors";
import InvestorDetails from "./pages/startup/InvestorDetails";
import Profile from "./pages/startup/Profile";
import Readiness from "./pages/startup/Readiness";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Investor routes */}
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route path="/investor/explore-startups" element={<ExploreStartups />} />
        <Route path="/investor/startup/:id" element={<StartupDetails />} />
        <Route path="/investor/analysis" element={<Analysis />} />
        <Route path="/investor/saved" element={<Saved />} />
        
        {/* Startup routes */}
        <Route path="/startup/dashboard" element={<StartupDashboard />} />
        <Route path="/startup/explore-investors" element={<ExploreInvestors />} />
        <Route path="/startup/investor/:id" element={<InvestorDetails />} />
        <Route path="/startup/profile" element={<Profile />} />
        <Route path="/startup/readiness" element={<Readiness />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
