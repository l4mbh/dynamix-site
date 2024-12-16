import { Button } from "@mui/material"
import { NavLink, IsAc } from "react-router-dom"
import { Link } from "react-router-dom"

const MainMenu = () => {

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: 'white',
        padding: '0 20px',
        height: '70px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      className='shadow-md'
    >
      <h2 className='flex items-center'>
        <img
          className="h-auto max-w-[150px]"
          src="http://localhost:1337/uploads/aidynamix_logo_1d299852f5.png"
          alt="image description"
        />
      </h2>
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          fontWeight: 'bold',
        }}
      >
        <NavLink to="/" className={({ isActive }) =>
          isActive ? '!mx-3 !text-yellow-500' : '!mx-3 !text-black'
        }>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? '!mx-3 !text-yellow-500' : '!mx-3 !text-black'
        }>
          About
        </NavLink>
        <NavLink to="/services" className={({ isActive }) =>
          isActive ? '!mx-3 !text-yellow-500' : '!mx-3 !text-black'
        }>
          Services
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) =>
          isActive ? '!mx-3 !text-yellow-500' : '!mx-3 !text-black'
        }>
          Blog
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? '!mx-3 !text-yellow-500' : '!mx-3 !text-black'
        }>
          Contact
        </NavLink>
      </ul>
    </div>
  )
}

export default MainMenu