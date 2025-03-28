import { create } from 'zustand'
import toast from 'react-hot-toast'

export const AuthStore = create((set)=>({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null ,
    userId: localStorage.getItem("userId") || null,
    isAuthenticated: !!localStorage.getItem("token"),

    storeToken:(token,role,userId) =>{
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
        localStorage.setItem("userId", userId)
        set({token, isAuthenticated:true, role, userId})
    },
    
    removeToken:()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("userId")
        toast.success("Logout successful")
        set({token:null, isAuthenticated:false, role:null, userId:null})
    }
}))