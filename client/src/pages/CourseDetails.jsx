import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {AuthStore} from '../store/AuthStore'
import Payment from '../components/Payment'

const CourseDetails = () => {
  const {id} = useParams()
  const token = AuthStore((state)=>state.token)
  const [course, setCourse] = useState("")
  const [lectureId, setLectureId] = useState('')

  const getLectures = async()=>{
    try {
      const res = await fetch(`http://localhost:3000/api/courses/lecture/${id}`,{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const getCourseDetails = async()=>{
    try {
      const res = await fetch(`http://localhost:3000/api/courses/get_course/${id}`,{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json()
      setCourse(data.course)
    } catch (error) {
      console.log(error)
    }
  }

  const isPurchased = false
  useEffect(()=>{
    getCourseDetails()
  },[])

  return (
    <div className="mt-16 flex flex-col space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-1 bg-gray-700 text-white p-6">
        <h1 className="text-2xl">{course.title}</h1>
        <p>{course.subtitle}</p>
        <p>
          Created by <span className="underline italic">Abcd efgh</span>
        </p>
        <p>Last updated on {new Date().toLocaleDateString()}</p>
        <p>Sudents enrolled: {course.enrolledStudents?.length}</p>
      </div>
      <div className="flex justify-between">
        <div className="w-full lg:w-1/2">
          <h1>Description</h1>
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          <div className="border border-gray-400 shadow-md p-5 rounded-lg mt-6">
            <h2 className="text-xl font-smeibold">Course Content</h2>
            <span>Number of lectures: {course.lectures?.length}</span>
          </div>
        </div>
        <div className="w-full lg:w-1/3 border border-gray-400">
          <div className="p-5">
            <div className="h-60">
              <p>react player</p>
            </div>
            <p>lecture title</p>
            <hr className="mt-2" />
            <p className="mt-2">Course price</p>
            <div className="flex justify-center w-full mt-2">
              {isPurchased ? (
                <button className="bg-gray-600 w-full hover:bg-gray-700 rounded-sm text-white cursor-pointer px-3 py-1">
                  Continue Course
                </button>
              ) : (
                <Payment id={id}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails