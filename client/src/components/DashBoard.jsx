import React, { useEffect, useState } from 'react'
import {AuthStore} from '../store/AuthStore'

const DashBoard = () => {
  const token = AuthStore((state)=>state.token)
  const [courses, setCourses] = useState([])
  const getAllCourses = async()=>{
    try {
      const res = await fetch("http://localhost:3000/api/purchase/getCourse",{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data.purchasedCourse);
      setCourses(data.purchasedCourse);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllCourses()
  },[])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Enrolled Students</th>
              <th className="px-6 py-3 border-b">Income</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {courses?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{item.courseId.title}</td>
                <td className="px-6 py-4 border-b">
                  Rs. {item.courseId.price}
                </td>
                <td className="px-6 py-4 border-b">
                  {item.courseId.enrolledStudents?.length}
                </td>
                <td className="px-6 py-4 border-b">
                  Rs.{" "}
                  {item.courseId.price * item.courseId.enrolledStudents?.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard