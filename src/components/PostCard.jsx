import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/postcard.css';

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
  ];
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}

export default function PostCard({ post, onHowl, onDelete, authorAvatar, index = 0 }) {
  const { user } = useAuth();
  const [lightbox, setLightbox] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isAuthor = user && post.author === user.username;
  const hasHowled = user && post.howls.includes(user.username);
  const initial = post.author.charAt(0).toUpperCase();

  const handleHowlClick = () => {
    onHowl(post.id);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(post.id), 400);
  };

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <div className={`post-card ${deleting ? 'deleting' : ''}`} style={{ '--i': index }}>
      <div className="post-header">
        <div className="post-avatar">
          {authorAvatar ? (
            <img src={authorAvatar} alt={post.author} className="post-avatar-img" />
          ) : (
            initial
          )}
        </div>
        <div className="post-author-group">
          <span className="post-author">{post.author}</span>
          <span className="post-time">{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      {post.content && <p className="post-content">{post.content}</p>}

      {post.image && (
        <div className="post-image-wrapper">
          <img
            src={post.image}
            alt="Post image"
            className="post-image"
            onClick={() => setLightbox(true)}
          />
        </div>
      )}

      <div className="post-actions">
        <button
          className={`btn-howl ${hasHowled ? 'howled' : ''}`}
          onClick={handleHowlClick}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={hasHowled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {post.howls.length > 0 && <span>{post.howls.length}</span>}
        </button>

        {isAuthor && (
          <button className="btn-delete" onClick={handleDelete}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        )}
      </div>

      {lightbox && (
        <div className="post-lightbox" onClick={() => setLightbox(false)}>
          <button className="post-lightbox-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img src={post.image} alt="Post image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
