import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'

const CourseDetails = () => {
    const {id} = useParams()
    const [course, setCourse] = useState("")
    const navigate = useNavigate()
    const getCourseDetails = async()=>{
        try {
            const res = await fetch(`http://localhost:3000/api/courses/get_course/${id}`);
            const data = await res.json()
            setCourse(data.course)
        } catch (error) {
            console.log(error)
        }
    }

    const stripePromise = loadStripe(
      "pk_test_51R7AfOQLP0VGAWlPObShRQ35FzY7te6UnXMMwRtmbDTkm5DosMCCF6ZWoHOYtgZ8RES9wlti9JPUDZxlYzABOvJR00RH7obhOO"
    );

    const makePayment = async(course)=>{
        try {
            const res = await fetch(
              `http://localhost:3000/api/payment/create-checkout-session`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  courseId: course._id,
                  courseName: course.title,
                  price: course.price,
                }),
              }
            );
            const session = await res.json();
            if (!session.id) {
              throw new Error("Failed to get Stripe session ID");
            }

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: session.id,
            });

            if (error) {
              console.error("Stripe Checkout Error:", error);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCourseDetails()
    },[id])
    
  return (
    <div>
      <div>
        <video src={course.video} autoPlay={false} controls muted className='h-96'/>
      </div>
        <div>
            <h1>{course.title}</h1>
            <p>{course.category}</p>
            <p>{course.price}</p>
            <p>{course.rating}</p>
            <p>{course.description}</p>
            <button className='text-red-600 cursor-pointer' onClick={()=>navigate(-1)}>Go back</button>
        </div>
        <div>
            <img src={course.image} alt={course.title} className='h-60'/>
        </div>
        <button className='text-green-600 text-lg font-bold cursor-pointer' onClick={()=>makePayment(course)}>Buy</button>
    </div>
  )
}

export default CourseDetails