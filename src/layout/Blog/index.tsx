import React from 'react'
import PageLayout from '../PageLayout'
import { Outlet } from 'react-router-dom'

interface BlogLayoutProps {
  children: React.ReactNode;
}

const index: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default index