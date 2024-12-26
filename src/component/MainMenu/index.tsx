import { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MenuDesktop from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { Language, Person } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const MainMenu = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  const { isAuthenticated, user, logout } = useAuth();

  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth < 1024); // Kiểm tra kích thước màn hình
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = document.documentElement.scrollTop;
      console.log(currentScrollY)

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowDesktopMenu(false); // Ẩn menu khi cuộn xuống
      } else {
        setShowDesktopMenu(true); // Hiện menu khi cuộn lên
      }

      setIsScrolled(currentScrollY > 60); // Kiểm tra cuộn qua 60px
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    if(isMenuOpen && isMobile) {
      setIsMenuOpen(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerMenu = document.getElementById('hamburger-menu'); // Giả sử bạn có id này cho nút hamburger

      // Kiểm tra nếu click bên ngoài mobile menu và không phải là click vào hamburger menu
      if (mobileMenu && !mobileMenu.contains(e.target as Node) && !hamburgerMenu?.contains(e.target as Node)) {
        setIsMenuOpen(false); // Đóng menu
      }
    };

    // Lắng nghe sự kiện click
    window.addEventListener('click', handleClickOutside);

    // Dọn dẹp sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleHamburgerClick = () => {
    setIsMenuOpen((prev) => !prev); // Mở hoặc đóng menu mobile
  };

  const handleSubmenuToggle = () => {
    setIsSubmenuOpen(!isSubmenuOpen); // Mở hoặc đóng submenu
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <AnimatePresence>
      {showDesktopMenu && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99,
            backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 1)",
            backdropFilter: isScrolled ? "blur(10px)" : "none", // Hiệu ứng mờ khi cuộn
            color: isScrolled ? "white" : "black",
            padding: "0",
            height: "60px",
            boxShadow: isScrolled ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.1s ease", // Hiệu ứng mượt mà
          }}
          className="lg:flex flex-row-reverse items-center justify-center !w-full"
        >
          <Container maxWidth="xl" className="!m-0 grid grid-cols-12 gap-4 items-center justify-center !w-full h-full">
            {/* Logo */}
            <h2 className="flex items-center lg:col-span-4 col-span-6">
              <Link to={"/"}>
                <img
                  className="h-auto max-w-[150px]"
                  src={
                    `${isScrolled ? commonHost + '/uploads/logo_dark_8781c1800b.png' : commonHost + '/uploads/logo_nbg_c876ce0dd0.png'}`
                  }
                  alt="image description"
                />
              </Link>
            </h2>

            {/* Nút Hamburger (chỉ hiển thị trên màn hình nhỏ) */}
            {isMobile && (
              <div className="col-span-6 w-full !h-full flex items-center justify-end" id="hamburger-menu">
                <Button
                  onClick={handleHamburgerClick}
                  className="lg:hidden"
                  style={{
                    padding: "0px",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span className={`h-1 w-7 bg-${isScrolled ? "white" : "black"}`}></span>
                  <span className={`h-1 w-7 bg-${isScrolled ? "white" : "black"}`}></span>
                  <span className={`h-1 w-7 bg-${isScrolled ? "white" : "black"}`}></span>
                </Button>
              </div>
            )}

            {/* Menu cho desktop */}
            {!isMobile && (
              <div className="col-span-4 h-full">
                <MenuDesktop
                  isSubmenuOpen={isSubmenuOpen}
                  handleSubmenuToggle={handleSubmenuToggle}
                  isScrolled={isScrolled}
                />
              </div>
            )}

            {!isMobile && (
              <div className="col-span-4 w-full h-full flex items-center justify-end gap-3">
                <div className="relative group">
                  <Language />
                  <ul className={`absolute group-hover:block border hidden top-full right-[-10px] ${isScrolled ? "!bg-[#252525]" : "!bg-white"} p-2 shadow-lg`}>
                    <li className="mb-2 cursor-pointer hover:text-yellow-primary">EN</li>
                    <li className="mb-2 cursor-pointer hover:text-yellow-primary">VI</li>
                  </ul>
                </div>
                {
                  !isAuthenticated ? (
                    <Link to="/auth?mode=login">
                      <Button variant="outlined" className={`!rounded-none ${isScrolled ? "!text-white !border-white" : "!text-black !border-black"}`}>Sign in</Button>
                    </Link>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      {isAuthenticated && (
                        <div className="relative h-full group">
                          <p className={`flex  items-center !text-normal h-full p-2 ${isScrolled ? "!text-white" : "!text-black"} cursor-pointer border border-transparent gap-2 group-hover:!text-yellow-primary`}>
                            <Person />
                            {user?.email}
                          </p>
                          <ul>
                            <li className="absolute hidden group-hover:block hover:!bg-slate-100 top-full right-[0] left-0 px-4 py-2 !text-black !bg-white shadow-lg mb-2 cursor-pointer hover:text-yellow-primary" onClick={handleLogout}>Logout</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                }
              </div>
            )}
          </Container>
        </motion.div>
      )}
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div id="mobile-menu">
          <MobileMenu
            isSubmenuOpen={isSubmenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleSubmenuToggle={handleSubmenuToggle}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default MainMenu;
