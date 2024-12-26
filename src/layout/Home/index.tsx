// src/layout/Home/index.tsx
import React from 'react';
import MainMenu from '../../component/MainMenu';
import HeroSection from '../../component/Home/Hero/HeroSection';
import Footer from '../../component/Footer/Footer';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className='relative z-0'>
      <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <MainMenu />
      </div>
      <main className='!min-h-full'>
        <HeroSection />
        <div style={{height: 'auto'}}>
          {children}
        </div>
      </main>
      <footer>
        <div className='w-full bg-slate-800 min-h-[200px]'>
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;