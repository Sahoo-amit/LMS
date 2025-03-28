import React, { useEffect } from 'react'
import { AuthStore } from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {removeToken} = AuthStore();
    const navigate = useNavigate()
    useEffect(()=>{
        removeToken()
        navigate('/')
    },[removeToken,navigate])
  return null
}

export default Logout