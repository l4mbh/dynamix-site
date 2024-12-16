import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="relative w-full h-[200px] bg-slate-100">
      <Container className="h-full flex items-center justify-between">
        <h1 className="p-5 text-3xl font-semibold text-[#777] capitalize">{title}</h1>
        <div className="p-5 text-sm font-semibold text-[#777]">
          <nav aria-label="breadcrumb">
            <ol className="flex space-x-2 text-gray-600">
              {breadcrumbs.map(({ breadcrumb, match }, index) => (
                <li key={index} className="flex items-center">
                  {index === breadcrumbs.length - 1 ? (
                    <span className='text-yellow-500'>{breadcrumb}</span>  // Không có liên kết cho breadcrumb cuối cùng
                  ) : (
                    <>
                      <Link to={match.pathname} className="hover:text-yellow-500">
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
