'use client'

import Link from "next/link"
import React from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


export default function SignUpPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    })
    const [isButtonDisable, setIsButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup',user)
            router.push('/login')
        } catch (error: any) {
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
                <h1>{loading ? "Processing" : "Sign up"}</h1>
                <hr />
                <label htmlFor="username">Username</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="text" id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />
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
                    onClick={onSignup}
                >
                    Signup here
                </button>
                <Link href='/login'>Visit login page</Link>
            </div>
        </>
    )
}