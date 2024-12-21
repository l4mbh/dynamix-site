// MobileMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion

interface MobileMenuProps {
  isSubmenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmenuToggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isSubmenuOpen, setIsMenuOpen, handleSubmenuToggle }) => {
  const commonHost = import.meta.env.VITE_COMMON_HOST
  return (
    // Sử dụng motion.div để thêm hiệu ứng trượt từ trái vào
    <motion.div
      className="fixed top-[60px] left-0 bottom-0 w-3/4 bg-white z-50 max-w-[300px]"
      initial={{ x: '-1%' }} // Đặt vị trí ban đầu ra ngoài màn hình bên trái
      animate={{ x: 0 }}       // Di chuyển vào vị trí 0
      exit={{ x: '-100%' }}     // Khi menu bị đóng, di chuyển ra ngoài màn hình
      transition={{ type: 'tween', stiffness: 150 }} // Hiệu ứng mượt mà
    >
      <ul className="flex flex-col items-center justify-center gap-5 py-10 text-2xl">
        <li>
          <img src={`${commonHost}/uploads/aidynamix_logo_1d299852f5.png`} alt="Company Logo" className="h-16" />
        </li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mx-3 text-yellow-primary" : "mx-3 text-black hover:text-yellow-primary"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "mx-3 text-yellow-primary" : "mx-3 text-black hover:text-yellow-primary"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </NavLink>
        <li className="relative py-3 text-black cursor-pointer flex flex-col items-center">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "mx-3 text-yellow-primary" : "mx-3 text-black hover:text-yellow-primary"
            }
            onClick={(e) => {
              e.preventDefault();
              handleSubmenuToggle();
            }}
          >
            Services
          </NavLink>

          {/* Submenu */}
          <Box
            component="div"
            className={`flex flex-col items-center ${isSubmenuOpen ? "block" : "hidden"} !text-secondary-text text-md !font-light`}
          >
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition">
              Submenu 1-1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition">
              Submenu 1-2
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition">
              Submenu 1-3
            </a>
          </Box>
        </li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "mx-3 text-yellow-primary" : "mx-3 text-black hover:text-yellow-primary"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "mx-3 text-yellow-primary" : "mx-3 text-black hover:text-yellow-primary"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </NavLink>
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
