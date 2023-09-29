'use client'

import Link from "next/link"
import React from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


export default function ResetPasswordPage() {
    const router = useRouter()
    const [token,setToken] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isButtonDisable, setIsButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const resetpassword = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/resetpassword',{token,password})
            console.log(response.data)
            toast.success('reset success')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.response.data.error)
        }finally{
            setLoading(false)
        }
    }
    React.useEffect(() => {
        setToken(window.location.search.split("=")[1])
        if (password.length > 0) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [password])
    return (
        <>
            <div><Toaster
                position="bottom-right"
                reverseOrder={false}
            /></div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading ? "Processing" : "Change Password"}</h1>
                <hr />
                <label htmlFor="password">New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={resetpassword}>
                    Reset password
                </button>
            </div>
        </>
    )
}