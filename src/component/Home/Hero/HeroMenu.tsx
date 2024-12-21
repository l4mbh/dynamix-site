import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HeroMenu = () => {

  const commonHost = import.meta.env.VITE_COMMON_HOST

  return (
    <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: 'white',
          padding: '0 20px',
          height: '70px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        className='shadow-md'
      >
        <h2 className='flex items-center'>
          <img
            className="h-auto max-w-[150px]"
            src={`${commonHost}/uploads/aidynamix_logo_1d299852f5.png`}
            alt="image description"
          />
        </h2>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
          }}
        > 
          <Button variant="text" color='warning' className='!min-h-full !text-lg !text-yellow-primary'>
            <Link to="/" className="!mx-3">
              Home
            </Link>
          </Button>
          <Button variant="text" color='warning' className='!min-h-full !text-lg !text-yellow-primary'>
            <Link to="/" className="!mx-3">
              About
            </Link>
          </Button>
          <Button variant="text" color='warning' className='!min-h-full !text-lg !text-yellow-primary'>
            <Link to="/" className="!mx-3">
              Services
            </Link>
          </Button>
          <Button variant="text" color='warning' className='!min-h-full !text-lg !text-yellow-primary'>
            <Link to="/" className="!mx-3">
              Blog
            </Link>
          </Button>
        </ul>
      </div>
  )
}

export default HeroMenu