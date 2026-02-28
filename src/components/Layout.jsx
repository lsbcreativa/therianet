import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/layout.css';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.username?.charAt(0).toUpperCase() || '?';

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src="/images/therianet-logo.png" alt="TheriaNet" className="sidebar-logo" />
            <span className="sidebar-brand-text">TheriaNet</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Feed</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="sidebar-user-avatar-img" />
              ) : (
                <span>{initial}</span>
              )}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user?.username}</span>
              <button onClick={handleLogout} className="sidebar-logout">Log out</button>
            </div>
          </div>
        </div>
      </aside>

      <header className="mobile-header">
        <div className="mobile-header-inner">
          <img src="/images/therianet-logo.png" alt="TheriaNet" className="mobile-logo" />
          <span className="mobile-brand-text">TheriaNet</span>
        </div>
      </header>

      <nav className="mobile-nav">
        <NavLink to="/" end className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Feed</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </NavLink>
        <button onClick={handleLogout} className="mobile-nav-link mobile-nav-logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </nav>

      <div className="layout-content">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
