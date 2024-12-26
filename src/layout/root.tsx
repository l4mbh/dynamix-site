/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import MainMenu from '../component/MainMenu';
import Footer from '../component/Footer/Footer';
import { Outlet } from 'react-router-dom';

interface RootLayoutProps {
  children: React.ReactNode;
}

const root: React.FC<RootLayoutProps> = () => {
  const [, setIsHomePage] = useState<boolean>(false);

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
      <div style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 2 }}>
        <MainMenu />
      </div>
      <main className='!min-h-full !max-w-screen-xl'>
        <div className='w-screen !p-0'>
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