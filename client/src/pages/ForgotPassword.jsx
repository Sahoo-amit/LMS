import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = async()=>{
      try {
        const res = await fetch("http://localhost:3000/api/auth/forgot_password",{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({email})
        });
        const data = await res.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='mt-20'>
      <div>
        <h1>ForgotPassword</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <button type='submit'>Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword