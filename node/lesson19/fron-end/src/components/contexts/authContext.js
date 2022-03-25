import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const AuthUpdate = createContext();

export const useToken = () => useContext(AuthContext);
export const useSetToken = () => useContext(AuthUpdate);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  return (
    <AuthUpdate.Provider value={setToken}>
      <AuthContext.Provider value={token}>{children}</AuthContext.Provider>
    </AuthUpdate.Provider>
  );
};
