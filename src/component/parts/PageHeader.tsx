import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

interface PageHeaderProps {
  title: string;
}

const routes = [
  { path: '/', breadcrumb: 'Home' },
  { path: '/blog', breadcrumb: 'Blog' },
  { path: '/blog/:id', breadcrumb: () => `Blog detail` },
  { path: '/about', breadcrumb: 'About' },
  { path: '/services', breadcrumb: 'services' },
  { path: '/services/:id', breadcrumb: () => `Service detail` },
];

const PageHeader: React.FC<PageHeaderProps> = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="relative w-full h-[100px]">
      <Container maxWidth="xl" className="h-full flex items-center justify-between mx-auto">
        <div className="uppercase  text-sm font-semibold text-[#777]">
          <nav aria-label="breadcrumb">
            <ol className="flex text-gray-600">
              {breadcrumbs.map(({ breadcrumb, match }, index) => (
                <li key={index} className="flex items-center">
                  {index === breadcrumbs.length - 1 ? (
                    <span className='text-yellow-primary'>{breadcrumb}</span>  // Không có liên kết cho breadcrumb cuối cùng
                  ) : (
                    <>
                      <Link to={match.pathname} className="hover:text-yellow-primary">
                        {breadcrumb}
                      </Link>
                      <span className="mx-2">/</span> {/* Dấu phân cách giữa các breadcrumb */}
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
