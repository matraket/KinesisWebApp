import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (secret: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return typeof window !== "undefined" && sessionStorage.getItem("cms_auth") === "true";
    } catch {
      return false;
    }
  });
  const [, setLocation] = useLocation();

  const login = async (secret: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      });

      if (response.ok) {
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("cms_auth", "true");
          }
        } catch {
          // Fallback if sessionStorage is not available
        }
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("cms_auth");
      }
    } catch {
      // Fallback if sessionStorage is not available
    }
    setIsAuthenticated(false);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
