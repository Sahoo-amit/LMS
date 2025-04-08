import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex'>
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-900 bg-gray-200 sticky top-0 left-0 p-5 h-screen">
        <div className="flex flex-col space-y-4 mt-20">
          <NavLink
            to="dashboard"
            className={({isActive})=> `${isActive ? "bg-gray-500":""} block py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="myUploads"
            className={({isActive})=> `${isActive ? "bg-gray-500":""} block py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors`}
          >
            Courses
          </NavLink>
        </div>
      </div>
      <div className="flex-grow p-5 mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout