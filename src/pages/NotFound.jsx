import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '8px', color: '#64748b' }}>404</h1>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Page not found</p>
      <Link to="/">Back to Feed</Link>
    </div>
  );
}
