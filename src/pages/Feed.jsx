import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getPosts, savePosts } from '../utils/storage';
import { processPostImage } from '../utils/image';
import PostCard from '../components/PostCard';
import '../styles/feed.css';
import '../styles/skeleton.css';

const MAX_CHARS = 280;

export default function Feed() {
  const { user } = useAuth();
  const addToast = useToast();
  const imageInputRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(getPosts());
    setTimeout(() => setLoading(false), 400);
  }, []);

  const sync = (updated) => {
    setPosts(updated);
    savePosts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const newPost = {
      id: crypto.randomUUID(),
      author: user.username,
      content: content.trim(),
      image: image || null,
      howls: [],
      createdAt: new Date().toISOString(),
    };

    sync([newPost, ...posts]);
    setContent('');
    setImage(null);
    addToast('Your howl is out there!');
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataURL = await processPostImage(file);
      setImage(dataURL);
    } catch (err) {
      addToast(err, 'error');
    } finally {
      e.target.value = '';
    }
  };

  const handleHowl = (postId) => {
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      const howls = p.howls.includes(user.username)
        ? p.howls.filter((h) => h !== user.username)
        : [...p.howls, user.username];
      return { ...p, howls };
    });
    sync(updated);
  };

  const handleDelete = (postId) => {
    sync(posts.filter((p) => p.id !== postId));
    addToast('Post deleted');
  };

  const filteredPosts = activeTab === 'mine'
    ? posts.filter((p) => p.author === user.username)
    : posts;

  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div className="feed-page">
      <div className="feed-welcome">
        <span className="feed-welcome-label">Welcome back,</span>
        <span className="feed-welcome-name">{user.username}</span>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form-header">
          <div className="post-form-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="post-form-avatar-img" />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <span className="post-form-username">{user.username}</span>
        </div>
        <div className="post-form-body">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={MAX_CHARS}
          />
        </div>

        {image && (
          <div className="post-form-image-preview">
            <img src={image} alt="Preview" />
            <button type="button" className="post-form-image-remove" onClick={() => setImage(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <div className="post-form-footer">
          <div className="post-form-footer-left">
            <button type="button" className="btn-attach" onClick={() => imageInputRef.current?.click()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="post-form-image-input"
            />
            <span className={`char-count ${content.length >= MAX_CHARS * 0.9 ? 'warn' : ''} ${content.length >= MAX_CHARS ? 'over' : ''}`}>
              {content.length}/{MAX_CHARS}
            </span>
          </div>
          <button type="submit" className="btn-post" disabled={!content.trim() && !image}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Howl it
          </button>
        </div>
      </form>

      <div className="feed-tabs">
        <button
          className={`feed-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Posts
        </button>
        <button
          className={`feed-tab ${activeTab === 'mine' ? 'active' : ''}`}
          onClick={() => setActiveTab('mine')}
        >
          My Posts
        </button>
        <div
          className="feed-tab-indicator"
          style={{ transform: `translateX(${activeTab === 'mine' ? '100%' : '0'})` }}
        />
      </div>

      {loading ? (
        <>
          {[0, 1, 2].map((i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-card-header">
                <div className="skeleton skeleton-avatar" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text skeleton-text-short" />
                  <div className="skeleton skeleton-text" style={{ width: '30%', height: 10 }} />
                </div>
              </div>
              <div className="skeleton-card-body">
                <div className="skeleton skeleton-text skeleton-text-long" />
                <div className="skeleton skeleton-text skeleton-text-short" />
              </div>
            </div>
          ))}
        </>
      ) : filteredPosts.length === 0 ? (
        <div className="feed-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          <p>{activeTab === 'mine' ? "You haven't howled yet. Write your first post!" : "No posts yet. Be the first to howl!"}</p>
        </div>
      ) : (
        <div className="feed-posts-container" key={activeTab}>
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              onHowl={handleHowl}
              onDelete={handleDelete}
              authorAvatar={post.author === user.username ? (user.avatar || null) : null}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
