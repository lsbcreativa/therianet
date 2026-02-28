import { Link } from 'react-router-dom';
import '../styles/notfound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <svg className="notfound-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
      </svg>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Lost in the wild</p>
      <Link to="/" className="notfound-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Feed
      </Link>
    </div>
  );
}
