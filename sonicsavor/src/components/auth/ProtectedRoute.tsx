"use client";

import { useAuth } from "./AuthProvider";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "guest" | "admin";
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredRole = "admin",
  fallback = <div className="text-center py-8 text-gray-500">Access denied</div>,
}: ProtectedRouteProps) {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (role !== requiredRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
