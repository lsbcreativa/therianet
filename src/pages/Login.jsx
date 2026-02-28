import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-effects">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="auth-particle"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 8}s`,
              '--duration': `${6 + Math.random() * 10}s`,
              '--size': `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="auth-card">
        <img src="/images/therianet-logo.png" alt="TheriaNet" className="auth-logo" />
        <h1 className="auth-title">TheriaNet</h1>
        <p className="auth-tagline">Where the pack connects</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose your identity"
              autoFocus
              minLength={2}
              maxLength={20}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Join the Pack
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div className="auth-features">
          <div className="auth-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Share your thoughts</span>
          </div>
          <div className="auth-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Howl at posts you love</span>
          </div>
          <div className="auth-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Build your profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
