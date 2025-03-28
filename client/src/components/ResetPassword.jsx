import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(newPassword !== confirmPassword){
            return toast.error("Passwords don't match.")
        }
        try {
            const res = await fetch("http://localhost:3000/api/auth/reset_password",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({newPassword, confirmPassword})
            })
            const data = await res.json
            console.log(data)
            setTimeout(()=>navigate('/signin'),2000)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <h2>Reset Password</h2>
      <form action="">
        <input type="password" placeholder='New password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
        <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword