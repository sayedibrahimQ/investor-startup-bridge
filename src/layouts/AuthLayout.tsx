
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export default function AuthLayout({ 
  children, 
  title, 
  description, 
  linkText, 
  linkHref 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-semibold">
                <span className="text-accent">Bridge</span>
                <span className="text-foreground">Invest</span>
              </span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
              {linkText && linkHref && (
                <>
                  {" "}
                  <Link to={linkHref} className="font-medium text-accent hover:text-accent/80 transition-colors">
                    {linkText}
                  </Link>
                </>
              )}
            </p>
          </div>
          
          <div className="mt-8 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm shadow-subtle px-4 py-8 sm:rounded-xl sm:px-8">
            {children}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
