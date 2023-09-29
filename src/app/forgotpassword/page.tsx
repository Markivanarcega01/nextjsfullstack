'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email,setEmail] = React.useState('')
    const resetPassword = async () => {
        const response = await axios.post('/api/users/forgotpassword', {email:email})
        console.log(response.data)
        router.push('/login')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={resetPassword}>
                Reset password
            </button>
        </div>
    )
}