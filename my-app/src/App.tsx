import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminPage from "./pages/AdminPage";
import Events from './pages/Events';
import Login from './pages/Login';              
import UserHomePage from './pages/UserHome';
import Attendance from './pages/Attendance';
import Booking from './pages/Booking';
import Calendar from './pages/Calendar';

function App() {
  

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* Public route - Login */}
          <Route path="/" element={<Login />} />

          {/* Protected routes - require authentication */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <UserHomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminRoute >
                  <AdminPage />
                </AdminRoute>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
