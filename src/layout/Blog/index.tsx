import React from 'react'
import { Outlet } from 'react-router-dom'

interface BlogLayoutProps {
  children: React.ReactNode;
}

const index: React.FC<BlogLayoutProps> = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default index