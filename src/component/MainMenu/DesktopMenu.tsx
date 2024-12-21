// MenuDesktop.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

interface MenuDesktopProps {
  isSubmenuOpen: boolean;
  handleSubmenuToggle: () => void;
  isScrolled: boolean;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({ isSubmenuOpen, handleSubmenuToggle, isScrolled }) => {
  return (
    <ul className="flex items-center justify-center list-none h-full relative lg:flex">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "mx-3 text-yellow-primary" : `mx-3 ${isScrolled ? "text-white" : "text-black"} hover:text-yellow-primary`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "mx-3 text-yellow-primary" : `mx-3 ${isScrolled ? "text-white" : "text-black"} hover:text-yellow-primary`
        }
      >
        About
      </NavLink>

      {/* Services with Submenu */}
      <li className="relative flex items-center h-full mx-3 text-black cursor-pointer group">
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-yellow-primary" : `${isScrolled ? "text-white" : "text-black"} hover:text-yellow-primary`
          }
          onClick={handleSubmenuToggle}
        >
          Services
        </NavLink>

        {/* Submenu */}
        <Box
          component="div"
          className={`absolute left-[-50%] top-[100%] bg-white shadow-lg w-52 hidden group-hover:block ${isSubmenuOpen ? "block" : "hidden"}`}
        >
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
            Submenu 1-1
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
            Submenu 1-2
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
            Submenu 1-3
          </a>
        </Box>
      </li>

      <NavLink
        to="/blog"
        className={({ isActive }) =>
          isActive ? "mx-3 text-yellow-primary" : `mx-3 ${isScrolled ? "text-white" : "text-black"} hover:text-yellow-primary`
        }
      >
        Blog
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "mx-3 text-yellow-primary" : `mx-3 ${isScrolled ? "text-white" : "text-black"} hover:text-yellow-primary`
        }
      >
        Contact
      </NavLink>
    </ul>
  );
};

export default MenuDesktop;
