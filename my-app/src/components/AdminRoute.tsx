import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const AdminRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/home",
  children,
}) => {
    const { user } = useAuth();
    console.log("AdminRoute - user role:", user);
  if (user?.role !== "Admin") {
    
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;