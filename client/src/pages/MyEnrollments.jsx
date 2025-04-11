import React, { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { AuthStore } from "../store/AuthStore";
import { CardSkeleton } from "../components/Skeleton";

const MyEnrollments = () => {
  const [myCourses, setMyCourses] = useState([]);
  const token = AuthStore((state)=>state.token);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const getCourse = async()=>{
    try {
      const res = await fetch("http://localhost:3000/api/purchase/purchasedCourse",{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data)
      setMyCourses(data.purchasedCourse)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCourse()
  },[])

  return (
    <div className="max-w-7xl mx-auto my-20 px-6 md:px-0">
      <h1 className="text-2xl font-bold">My Enrollments</h1>
      <div className="my-10">
        {isLoading ? (
          <CardSkeleton />
        ) : myCourses.length === 0 ? (
          <p>You haven't purchsed any course.</p>
        ) : (
          <div>
            {myCourses.map((item, index) => (
              <div key={index}>
                <div>
                  <img src={item.courseId.image} alt="" />
                </div>
                <div>
                  <Link to={`/course_progress/${item.courseId._id}`}><h1>{item.courseId.title}</h1></Link>
                  <p>{item.courseId.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;
