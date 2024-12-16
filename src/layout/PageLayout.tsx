// src/layout/Home/index.tsx
import React from 'react';
import { Container } from '@mui/material';
import MainMenu from '../component/MainMenu';
import Footer from '../component/Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative z-0'>
      <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <MainMenu />
      </div>
      <main className='!min-h-full'>
        <div style={{height: 'auto', display: 'flex', flexDirection: 'column', flexGrow: 2}}>
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

export default PageLayout;