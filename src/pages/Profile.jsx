import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getPosts, savePosts } from '../utils/storage';
import { processAvatarFile } from '../utils/avatar';
import PostCard from '../components/PostCard';
import '../styles/profile.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const addToast = useToast();
  const fileInputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [posts, setPosts] = useState(() =>
    getPosts().filter((p) => p.author === user?.username)
  );

  const postCount = posts.length;
  const howlsReceived = posts.reduce((sum, p) => sum + p.howls.length, 0);

  const handleSave = () => {
    updateProfile({ bio });
    setEditing(false);
    addToast('Bio updated successfully');
  };

  const handleCancel = () => {
    setBio(user.bio);
    setEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const dataURL = await processAvatarFile(file);
      updateProfile({ avatar: dataURL });
      addToast('Profile photo updated');
    } catch (err) {
      addToast(err, 'error');
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  const handleHowl = (postId) => {
    const allPosts = getPosts();
    const updated = allPosts.map((p) => {
      if (p.id !== postId) return p;
      const howls = p.howls.includes(user.username)
        ? p.howls.filter((h) => h !== user.username)
        : [...p.howls, user.username];
      return { ...p, howls };
    });
    savePosts(updated);
    setPosts(updated.filter((p) => p.author === user.username));
  };

  const handleDelete = (postId) => {
    const allPosts = getPosts().filter((p) => p.id !== postId);
    savePosts(allPosts);
    setPosts(allPosts.filter((p) => p.author === user.username));
    addToast('Post deleted');
  };

  const initial = user?.username?.charAt(0).toUpperCase() || '?';
  const memberSince = new Date(user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-banner-overlay" />
        </div>

        <div className="profile-avatar-wrapper" onClick={handleAvatarClick}>
          <div className="profile-avatar-ring" />
          <div className={`profile-avatar ${uploadingAvatar ? 'uploading' : ''}`}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="profile-avatar-img" />
            ) : (
              <span className="profile-avatar-initial">{initial}</span>
            )}
          </div>
          <div className="profile-avatar-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="profile-avatar-input"
          />
        </div>

        <h1 className="profile-username">{user.username}</h1>
        <p className="profile-meta">Member since {memberSince}</p>

        <div className="profile-stats">
          <div className="profile-stat-card">
            <span className="profile-stat-value">{postCount}</span>
            <span className="profile-stat-label">Posts</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-value">{howlsReceived}</span>
            <span className="profile-stat-label">Howls received</span>
          </div>
        </div>

        {editing ? (
          <div className="bio-form">
            <label className="bio-label">About you</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the pack about yourself..."
              maxLength={160}
            />
            <div className="bio-form-footer">
              <span className="bio-char-count">{bio.length}/160</span>
              <div className="bio-actions">
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                <button className="btn-save" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-bio-section">
            <p className="profile-bio">{user.bio || 'No bio yet. Tell the pack about yourself.'}</p>
            <button className="btn-edit" onClick={() => setEditing(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Bio
            </button>
          </div>
        )}
      </div>

      <h2 className="profile-posts-title">Your Posts</h2>
      {posts.length === 0 ? (
        <div className="profile-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p>No posts yet. Head to the feed and start howling!</p>
        </div>
      ) : (
        posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            onHowl={handleHowl}
            onDelete={handleDelete}
            authorAvatar={user.avatar || null}
            index={index}
          />
        ))
      )}
    </div>
  );
}
