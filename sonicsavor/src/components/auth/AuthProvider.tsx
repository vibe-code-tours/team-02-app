"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useEffect, useState } from "react";

type Role = "guest" | "admin";

interface AuthContextType {
  role: Role;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  role: "guest",
  isLoading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("guest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch role from session/API
    fetch("/api/auth/role")
      .then((res) => res.json())
      .then((data) => setRole(data.role ?? "guest"))
      .catch(() => setRole("guest"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Auth0Provider>
      <AuthContext.Provider value={{ role, isLoading }}>
        {children}
      </AuthContext.Provider>
    </Auth0Provider>
  );
}
