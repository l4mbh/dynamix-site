import React from 'react';
import { Button } from '@mui/material';



const MainButton = ({title} : {title: string}) => {
  return (
    <div className='mx-auto bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 max-w-fit !text-black !text-lg !font-bold !capitalize !p-2 !px-10 rounded-full cursor-pointer mt-5'>
      {title}
    </div>
  );
};

export default MainButton;
