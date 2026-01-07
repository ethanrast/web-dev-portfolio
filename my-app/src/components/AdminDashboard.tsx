import React from "react";
import '../App.css';
import PageTitle from "./PageTitle";
import EventslistAdmin from "./EventslistAdmin";
function AdminDashboard() {
  return (
    <div className="container col-md-9 py-3">
      <PageTitle name="Admin Dashboard" />
      <EventslistAdmin />
    </div>
  );
}
export default AdminDashboard;