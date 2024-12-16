import axios from 'axios';

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api', // URL gốc của API
  timeout: 10000, // Thời gian timeout
});

// Thêm interceptor để xử lý request và response
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung (ví dụ: refresh token, thông báo lỗi, v.v.)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
