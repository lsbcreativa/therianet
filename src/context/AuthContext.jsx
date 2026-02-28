import { createContext, useContext, useState } from 'react';
import { getUser, saveUser, removeUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser);

  const login = (username) => {
    const newUser = {
      id: crypto.randomUUID(),
      username: username.trim(),
      bio: '',
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    setUser(newUser);
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    saveUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
