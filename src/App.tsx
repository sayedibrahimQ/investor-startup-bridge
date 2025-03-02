
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartupDashboard from "./pages/startup/Dashboard";
import StartupProfile from "./pages/startup/Profile";
import StartupReadiness from "./pages/startup/Readiness";
import StartupExploreInvestors from "./pages/startup/ExploreInvestors";
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorExploreStartups from "./pages/investor/ExploreStartups";
import InvestorAnalysis from "./pages/investor/Analysis";
import InvestorSavedStartups from "./pages/investor/Saved";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Startup Routes */}
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
            <Route path="/startup/profile" element={<StartupProfile />} />
            <Route path="/startup/readiness" element={<StartupReadiness />} />
            <Route path="/startup/explore-investors" element={<StartupExploreInvestors />} />
            
            {/* Investor Routes */}
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/investor/explore-startups" element={<InvestorExploreStartups />} />
            <Route path="/investor/analysis" element={<InvestorAnalysis />} />
            <Route path="/investor/saved" element={<InvestorSavedStartups />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
