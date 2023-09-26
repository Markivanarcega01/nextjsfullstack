'use client'

import Link from "next/link"
import React from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [isButtonDisable, setIsButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login',user)
            console.log(response.data)
            toast.success('Login success')
            router.push('/profile')
        } catch (error: any) {
            toast.error(error.response.data.error)
        }finally{
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [user])
    return (
        <>
            <div><Toaster
                position="bottom-right"
                reverseOrder={false}
            /></div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading ? "Processing" : "Login"}</h1>
                <hr />
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="text" id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={onLogin}>
                    Login here
                </button>
                <Link href='/signup'>Visit signup page</Link>
            </div>
        </>
    )
}