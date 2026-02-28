import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../utils/storage';
import PostCard from '../components/PostCard';
import { savePosts } from '../utils/storage';
import '../styles/profile.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [posts, setPosts] = useState(() =>
    getPosts().filter((p) => p.author === user?.username)
  );

  const handleSave = () => {
    updateProfile({ bio });
    setEditing(false);
  };

  const handleCancel = () => {
    setBio(user.bio);
    setEditing(false);
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
  };

  const initial = user?.username?.charAt(0).toUpperCase() || '?';
  const memberSince = new Date(user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div>
      <div className="profile-card">
        <div className="profile-avatar">{initial}</div>
        <h1 className="profile-username">{user.username}</h1>

        {editing ? (
          <div className="bio-form">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              maxLength={160}
            />
            <div className="bio-actions">
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        ) : (
          <>
            <p className="profile-bio">{user.bio || 'No bio yet.'}</p>
            <p className="profile-meta">Member since {memberSince}</p>
            <button className="btn-edit" onClick={() => setEditing(true)}>Edit Bio</button>
          </>
        )}
      </div>

      <h2 className="profile-posts-title">Your Posts</h2>
      {posts.length === 0 ? (
        <p className="profile-empty">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onHowl={handleHowl} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
