import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {AuthStore} from '../store/AuthStore'
import Payment from '../components/Payment'
import { CiLock } from "react-icons/ci";
import ReactPlayer from "react-player"
import { IoPlayCircleOutline } from "react-icons/io5";

const CourseDetails = () => {
  const {id} = useParams()
  const token = AuthStore((state)=>state.token)
  const [course, setCourse] = useState("")
  const [isPurchased, setIsPurchased] = useState(false)
  const navigate = useNavigate()

  
  const getPurchasedCourse = async()=>{
    try {
      const res = await fetch(`http://localhost:3000/api/purchase/course/${id}/get_course`,{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data)
      setIsPurchased(data.purchasedCourse);
    } catch (error) {
      console.log(error)
    }
  }

  const handleProgress = ()=>{
    if(isPurchased){
        navigate(`/course_progress/${id}`)
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
      console.log(data.course)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCourseDetails()
    getPurchasedCourse()
  },[id])

  return (
    <div className="mt-16 flex flex-col space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-1 bg-gray-700 text-white p-6">
        <h1 className="text-2xl">{course.title}</h1>
        <p>{course.subtitle}</p>
        <p>
          Created by{" "}
          <span className="underline italic">{course.teacher?.username}</span>
        </p>
        <p>Last updated on {course.updatedAt?.split("T")[0]}</p>
        <p>Students enrolled: {course.enrolledStudents?.length}</p>
      </div>
      <div className="flex justify-between">
        <div className="w-full lg:w-1/2">
          <h1>Description</h1>
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          <div className="border border-gray-400 shadow-md p-5 rounded-lg mt-6">
            <h2 className="text-xl font-smeibold">Course Content</h2>
            <span>Number of lectures: {course.lectures?.length}</span>
            {course.lectures?.map((item, index) => (
              <div key={index} className="flex items-center gap-3 mt-2">
                <span>
                  {item.isPreviewFree ? <IoPlayCircleOutline /> : <CiLock />}
                </span>
                <span>{item.lectureTitle}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 border border-gray-400">
          <div className="p-5">
            <div className="h-60">
              <ReactPlayer url={course?.lectures?.[0].videoUrl} width={"100%"} height={"100%"} controls/>
            </div>
            <p>{course?.lectures?.[0].lectureTitle}</p>
            <hr className="mt-2" />
            <p className="mt-2">Price: Rs.{course.price}</p>
            <div className="flex justify-center w-full mt-2">
              {isPurchased ? (
                <button onClick={handleProgress} className="bg-gray-600 w-full hover:bg-gray-700 rounded-sm text-white cursor-pointer px-3 py-1">
                  Continue course
                </button>
              ) : (
                <Payment id={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails