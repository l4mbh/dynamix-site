import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';

const LoginRegisterForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');

  useEffect(() => {
    if (mode === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    setAuthError(null);
    setErrors({ email: '', password: '', confirmPassword: '' });
  }, [mode]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    navigate(`/auth?mode=${isLogin ? 'register' : 'login'}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = { email: '', password: '', confirmPassword: '' };
    let isValid = true;

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    // Kiểm tra confirm password
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async (email: string, password: string) => {
    try {
      // Gửi yêu cầu đăng ký tới API của Strapi
      const response = await axiosInstance.post('/auth/local/register', {
        username: email, // Dùng email làm tên người dùng (Strapi yêu cầu trường username cho đăng ký)
        email: email,
        password: password,
      });

      // Xử lý phản hồi từ Strapi
      if (response.data) {
        console.log('Đăng ký thành công:', response.data);
        return response.data; // Bạn có thể lưu thông tin người dùng vào context, localStorage, hoặc sessionStorage
      }
    } catch (error) {
      // Xử lý lỗi
      if (axios.isAxiosError(error)) {
        console.error('Register error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Register failed, maybe this email is already in use.');
      } else {
        console.error('Register error:', error);
        throw new Error('Register failed, maybe this email is already in use.');
      }
    }
  };

  const { login } = useAuth();

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (mode === 'register') {
        try {
          await registerUser(formData.email, formData.password);
        } catch (error) {
          if (isAxiosError(error)) {
            const errorMessage = error.response?.data
              ? typeof error.response?.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data) // Chuyển đối tượng thành chuỗi
              : error.message || 'An unknown error occurred';

            setAuthError(errorMessage);
            console.error('Register error:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            setAuthError(error.message);
            console.error('Register error:', error.message);
          } else {
            setAuthError('An unknown error occurred during registration');
            console.error('Register error: Unknown error');
          }
        }
      } else if (mode === 'login') {
        try {
          await login(formData.email, formData.password);
          navigate('/');
        } catch (error) {
          if (isAxiosError(error)) {
            const errorMessage = error.response?.data
              ? typeof error.response?.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data) // Chuyển đối tượng thành chuỗi
              : error.message || 'An unknown error occurred';

            setAuthError(errorMessage);
            console.error('Login error:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            setAuthError(error.message);
            console.error('Login error:', error.message);
          } else {
            setAuthError('An unknown error occurred during login');
            console.error('Login error: Unknown error');
          }
        }
      }
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        key={isLogin ? 'login' : 'register'}
        className="bg-white p-8  shadow-lg w-full max-w-md"
        initial={{ x: isLogin ? '50%' : '-50%' }}
        animate={{ x: 0 }}
        exit={{ x: isLogin ? '-50%' : '50%' }}
        transition={{ type: 'spring', stiffness: 300, duration: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 uppercase tracking-widest">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 "
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 "
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 !rounded-none"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className="!bg-black !capitalize !text-white !font-bold !text-lg py-2 px-4 w-40 h-12 !rounded-none hover:!bg-yellow-primary transition-colors duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          {authError && <p className="text-red-500 text-sm my-3 text-center">{authError}</p>}
        </form>

        <div className="mt-4 text-center">
          <span
            className="text-black cursor-pointer hover:text-yellow-primary"
            onClick={toggleForm}
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRegisterForm;
