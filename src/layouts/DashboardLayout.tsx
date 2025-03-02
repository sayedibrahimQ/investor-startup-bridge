
import { ReactNode, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart, 
  BookmarkIcon, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const isStartup = user?.role === "startup";
  
  const navigation = isStartup
    ? [
        { name: "Dashboard", href: "/startup/dashboard", icon: LayoutDashboard },
        { name: "Profile", href: "/startup/profile", icon: Settings },
        { name: "Investment Readiness", href: "/startup/readiness", icon: BarChart },
        { name: "Explore Investors", href: "/startup/explore-investors", icon: Users },
      ]
    : [
        { name: "Dashboard", href: "/investor/dashboard", icon: LayoutDashboard },
        { name: "Explore Startups", href: "/investor/explore-startups", icon: Briefcase },
        { name: "Investment Analysis", href: "/investor/analysis", icon: BarChart },
        { name: "Saved Startups", href: "/investor/saved", icon: BookmarkIcon },
      ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <div 
        className={cn(
          "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:translate-x-0" : "md:translate-x-[-100%] md:w-0"
        )}
      >
        {/* Sidebar background */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-border">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between flex-shrink-0 px-4">
              <Link to="/" className="text-xl font-semibold tracking-tight">
                <span className="text-accent">Bridge</span>
                <span className="text-foreground">Invest</span>
              </Link>
              <button
                className="md:hidden rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-4 mt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {isStartup ? 'Startup Tools' : 'Investor Tools'}
              </p>
              <nav className="mt-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isStartup ? 'Startup Account' : 'Investor Account'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="ml-auto flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div 
        className={cn(
          "fixed inset-0 flex z-40 md:hidden transform transition-transform ease-in-out duration-300",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link to="/" className="text-xl font-semibold tracking-tight">
                <span className="text-accent">Bridge</span>
                <span className="text-foreground">Invest</span>
              </Link>
            </div>
            
            <div className="px-4 mt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {isStartup ? 'Startup Tools' : 'Investor Tools'}
              </p>
              <nav className="mt-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                    )}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isStartup ? 'Startup Account' : 'Investor Account'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="ml-auto flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "md:pl-64" : ""
      )}>
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden md:block absolute left-0 top-3 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "rounded-r-lg rounded-l-none border-l-0 transition-transform",
              isSidebarOpen ? "" : "rotate-180"
            )}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </Button>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
