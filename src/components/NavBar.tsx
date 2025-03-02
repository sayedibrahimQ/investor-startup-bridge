
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/startup') || location.pathname.includes('/investor');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  if (isDashboard) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-accent">Bridge</span>
          <span className="text-foreground">Invest</span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/"
            className={({ isActive }) => cn(
              "text-sm font-medium transition-colors",
              isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
            )}
          >
            Home
          </NavLink>
          
          {!isAuthenticated ? (
            <>
              <NavLink 
                to="/login"
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                )}
              >
                Login
              </NavLink>
              <NavLink to="/signup">
                <Button variant="default" size="sm" className="rounded-full px-6">
                  Sign Up
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink 
                to={`/${user?.role}/dashboard`}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                )}
              >
                Dashboard
              </NavLink>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-sm font-medium"
              >
                Logout
              </Button>
            </>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md p-4 absolute w-full animate-in fade-in">
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/"
              className={({ isActive }) => cn(
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
              )}
            >
              Home
            </NavLink>
            
            {!isAuthenticated ? (
              <>
                <NavLink 
                  to="/login"
                  className={({ isActive }) => cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup"
                  className={({ isActive }) => cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to={`/${user?.role}/dashboard`}
                  className={({ isActive }) => cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Dashboard
                </NavLink>
                <button 
                  onClick={logout}
                  className="text-lg font-medium py-2 text-left text-foreground/80 hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
