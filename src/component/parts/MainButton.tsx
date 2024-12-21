import React from 'react';
import { Button } from '@mui/material';



const MainButton = ({ title, style }: { title: string, style?: string }) => {

  if (style === 'outlined') {
    return (
      <div className='m-auto border border-black hover:shadow-md hover:bg-yellow-400 transition-colors duration-200 max-w-fit !text-black !text-md !font-bold !capitalize !py-2 !px-4 cursor-pointer'>
        {title}
      </div>
    )
  }

  return (
    <div className='m-auto bg-black hover:shadow-md hover:bg-yellow-400 transition-colors duration-200 max-w-fit !text-white !text-md !font-bold !capitalize !py-2 !px-4 cursor-pointer'>
      {title}
    </div>
  );
};

export default MainButton;
