import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const initial = user.username.charAt(0).toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src="/images/therianet-logo.png" alt="TheriaNet" className="navbar-logo" />
          <span>TheriaNet</span>
        </Link>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Feed
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <div className="navbar-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="navbar-avatar-img" />
              ) : (
                <span className="navbar-avatar-initial">{initial}</span>
              )}
            </div>
            Profile
          </NavLink>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}
