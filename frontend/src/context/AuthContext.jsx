import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Use the 'api' instance to make the request
      const response = await api.post('/auth/login', { email, password });
      
      // Save user (which includes the token) to state and localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name, email, phone, password, role) => {
     try {
      const response = await api.post('/auth/register', { name, email, phone, password, role });
      
      // Save user to state and localStorage after successful registration
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    // Remove user from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  // Provide the user state and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};