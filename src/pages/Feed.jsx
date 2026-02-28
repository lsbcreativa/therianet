import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPosts, savePosts } from '../utils/storage';
import PostCard from '../components/PostCard';
import '../styles/feed.css';

const MAX_CHARS = 280;

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

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
  };

  return (
    <div>
      <h1 className="feed-header">Feed</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={MAX_CHARS}
        />
        <div className="post-form-footer">
          <span className={`char-count ${content.length > MAX_CHARS ? 'over' : ''}`}>
            {content.length}/{MAX_CHARS}
          </span>
          <button type="submit" className="btn-post" disabled={!content.trim()}>
            Howl it
          </button>
        </div>
      </form>

      {posts.length === 0 ? (
        <p className="feed-empty">No posts yet. Be the first to howl!</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onHowl={handleHowl} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
