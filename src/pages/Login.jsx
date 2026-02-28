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
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src="/images/therianet-logo.png" alt="TheriaNet" className="auth-logo" />
        <p className="auth-subtitle">Pick a username to start howling</p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            autoFocus
            minLength={2}
            maxLength={20}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Enter</button>
      </form>
    </div>
  );
}
