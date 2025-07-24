import React from 'react'
import {AuthStore} from '../store/AuthStore'

const Payment = ({id}) => {
  const token = AuthStore((state)=>state.token)
  const makePayment = async()=>{
    try {
      const res = await fetch(
        `http://localhost:3000/api/purchase/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: id }),
        }
      );
      const data = await res.json()
      if(data.url){
        window.location.href = data.url
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={makePayment} className="bg-gray-600 w-full hover:bg-gray-700 rounded-sm text-white cursor-pointer px-3 py-1">
        Purchase course
      </button>
    </div>
  );
}

export default Payment