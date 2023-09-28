'use client'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = React.useState('')

    const logout = async()=>{
        try{
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        }catch(error:any){
            toast.error(error.message)
        }
    }

    const getUserDetails = async()=>{
        try {
            const response = await axios.get('/api/users/me')
            console.log(response.data)
            setData(response.data.data._id)
        } catch (error:any) {
            console.log(error.message)
        }
    }

    return(
        <>
        <div><Toaster
                position="bottom-right"
                reverseOrder={false}
            /></div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className='text-white'>{data === '' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={logout}>Logout</button>
            <button className="bg-violet-500 text-white py-2 px-4 mt-4" onClick={getUserDetails}>Get user details</button>
        </div>
        </>
    )
}