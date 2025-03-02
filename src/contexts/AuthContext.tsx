
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "startup" | "investor";
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: "startup" | "investor") => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage and validate it
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // In a real implementation, you would validate with your backend
      // For now, we'll just decode and trust the token
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
      setIsLoading(false);
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call your API
      // const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login/`, {
      //   email,
      //   password,
      // });
      
      // Mock user for demonstration
      const mockUser = {
        id: "user-123",
        email,
        role: email.includes("investor") ? "investor" : "startup" as "investor" | "startup",
        name: email.split("@")[0],
      };
      
      // const { token } = response.data;
      const mockToken = "mock-jwt-token";
      
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: "startup" | "investor") => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call your API
      // const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register/`, {
      //   email,
      //   password,
      //   role,
      // });
      
      // Mock user for demonstration
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        role,
        name: email.split("@")[0],
      };
      
      // const { token } = response.data;
      const mockToken = "mock-jwt-token";
      
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed. Please try again with a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
