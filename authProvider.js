import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [uid,setUid] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken , uid, setUid}}>
      {children}
    </AuthContext.Provider>
  );
};