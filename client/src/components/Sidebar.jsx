import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div>
            <p>
                <NavLink to='/add_course'>Add Course</NavLink>
            </p>
            <p>
                <NavLink to='/my_course'>My Courses</NavLink>
            </p>
        </div>
    </div>
  )
}

export default Sidebar