import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import NotFound from '../pages/404';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import BlogLayout from '../layout/Blog';
import Services from '../pages/Services';
import RootLayout from '../layout/root';  // Đổi tên thành RootLayout
import { AuthProvider } from '../context/AuthContext';
import '../index.css';
import LoginRegisterForm from '../pages/UserAuth/LoginRegisterForm';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Sử dụng RootLayout cho tất cả các trang */}
          <Route path='/' element={<RootLayout children={undefined} />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<BlogLayout children={undefined} />}>
              <Route index element={<Blog />} />
              <Route path=":id" element={<BlogDetail />} />
            </Route>
            <Route path="services" element={<Services />} />
            <Route path="auth" element={<LoginRegisterForm />} />
          </Route>
          {/* Trang không tìm thấy */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
