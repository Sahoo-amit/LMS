import React from 'react'
import { useNavigate } from 'react-router-dom'

const UploadLecture = () => {
    const navigate = useNavigate()
    const handleClick =()=>{
        navigate(-1)
    }
  return (
    <div>
        <h1>Upload Lectures</h1>
        <button onClick={handleClick}>Go Back</button>
    </div>
  )
}

export default UploadLecture