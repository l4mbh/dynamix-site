/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import MainMenu from '../component/MainMenu';
import Footer from '../component/Footer/Footer';
import HeroSection from '../component/Home/Hero/HeroSection';
import { Outlet } from 'react-router-dom';

interface RootLayoutProps {
  children: React.ReactNode;
}

const root: React.FC<RootLayoutProps> = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  useEffect(() => {
    // Kiểm tra nếu đang ở trang chủ
    if (window.location.pathname === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, []);
  return (
    <div className='relative z-0'>
      <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <MainMenu />
      </div>
      <main className='!min-h-full'>
        <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
          <Outlet/>
        </div>
      </main>
      <footer>
        <div className='w-full bg-slate-800 min-h-[200px]'>
          <Footer />
        </div>
      </footer>
    </div>
  )
}

export default root