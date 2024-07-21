import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Header/>
        <div className='container'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout