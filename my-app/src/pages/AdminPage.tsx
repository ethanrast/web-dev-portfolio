import React from "react";
import "../App.css";
import Navigation from "../nav-components/NavigationUser";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="App row">
      <Navigation />
      <AdminDashboard />
    </div>
  );
}
