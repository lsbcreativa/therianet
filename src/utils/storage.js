const KEYS = {
  USER: 'therianet_user',
  POSTS: 'therianet_posts',
};

export const getUser = () => {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user) => {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(KEYS.USER);
};

export const getPosts = () => {
  const data = localStorage.getItem(KEYS.POSTS);
  return data ? JSON.parse(data) : [];
};

export const savePosts = (posts) => {
  localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
};
