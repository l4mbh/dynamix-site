// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

interface User {
  id: number;
  username: string;
  email: string;
  // Thêm các trường khác của user nếu cần
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Lưu thông tin người dùng
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Tạo provider cho AuthContext
export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Thêm state để lưu thông tin người dùng
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa (kiểm tra trong localStorage)
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    if (user) {
      setUser(JSON.parse(user)); // Lưu thông tin người dùng nếu có
    }
  }, []);

  // Hàm login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/local', {
        identifier: email,
        password: password,
      });

      const { jwt, user } = response.data;
      localStorage.setItem('authToken', jwt); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
      setIsAuthenticated(true);
      setUser(user); // Cập nhật thông tin người dùng vào state
      setError(null); // Reset lỗi khi login thành công
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login');
      }
      throw new Error(error.response?.data.message || 'Login failed');
    }
  };

  // Hàm logout
  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null); // Reset thông tin người dùng khi logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
