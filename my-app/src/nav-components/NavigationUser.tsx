import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Navigation */}
      <nav className="nav nav-pills start-0 col-md-2 justify-content-top d-flex gap-2 flex-column text-white bg-dark vh-100 p-3">
        <div className="nav flex-column position-sticky top-0">
          <h1 className="p-2 text-white">TrickyWeb</h1>
          <hr className="text-white"/>
          
          {/* User info */}
          {user && (
            <div className="text-white small mb-2 px-2">
              Logged in as: <strong>{user.name}</strong>
            </div>
          )}

          {/* NavLinks with active class */}
          <NavLink 
            className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")} 
            to="/home"
          >
            Home
          </NavLink> 
          <NavLink 
            className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")} 
            to="/events"
          >
            Events
          </NavLink>
          <NavLink 
            className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")} 
            to="/calendar"
          >
            Calendar
          </NavLink> 
          <NavLink 
            className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")} 
            to="/booking"
          >
            Booking
          </NavLink>
          <NavLink 
            className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")} 
            to="/attendance"
          >
            Attendance
          </NavLink>
          
          {user?.role?.toLowerCase() === "admin" && (
            <NavLink
              className={({ isActive }) => (isActive ? "active nav-link" : "nav-link text-white")}
              to="/admin"
            >
              Admin
            </NavLink>
          )}
          <hr className="text-white"/>
          
          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className="btn btn-outline-light mt-2"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;