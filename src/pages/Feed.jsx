import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getPosts, savePosts } from '../utils/storage';
import PostCard from '../components/PostCard';
import '../styles/feed.css';

const MAX_CHARS = 280;

export default function Feed() {
  const { user } = useAuth();
  const addToast = useToast();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [justPosted, setJustPosted] = useState(false);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const sync = (updated) => {
    setPosts(updated);
    savePosts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: crypto.randomUUID(),
      author: user.username,
      content: content.trim(),
      howls: [],
      createdAt: new Date().toISOString(),
    };

    sync([newPost, ...posts]);
    setContent('');
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 800);
    addToast('Your howl is out there!');
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

      <form className={`post-form ${justPosted ? 'post-form-flash' : ''}`} onSubmit={handleSubmit}>
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
        <div className="post-form-footer">
          <span className={`char-count ${content.length >= MAX_CHARS * 0.9 ? 'warn' : ''} ${content.length >= MAX_CHARS ? 'over' : ''}`}>
            {content.length}/{MAX_CHARS}
          </span>
          <button type="submit" className="btn-post" disabled={!content.trim()}>
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

      {filteredPosts.length === 0 ? (
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
        filteredPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            onHowl={handleHowl}
            onDelete={handleDelete}
            authorAvatar={post.author === user.username ? (user.avatar || null) : null}
            index={index}
          />
        ))
      )}
    </div>
  );
}
