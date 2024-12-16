import { Grid2 } from '@mui/material';
import React from 'react'
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return <Grid2 className={`!w-full !min-h-full flex items-center justify-center relative`}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#ebd300"
        ariaLabel="oval-loading"
        secondaryColor='gray'
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Grid2>;
}

export default Loading