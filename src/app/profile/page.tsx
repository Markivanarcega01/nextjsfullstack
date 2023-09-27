'use client'
import axios from 'axios'
import Link from 'next/link'
import toast, {Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage(){
    const router = useRouter()
    const logout = async()=>{
        try{
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        }catch(error:any){
            toast.error(error.message)
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
            <hr />
            <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={logout}>Logout</button>
        </div>
        </>
    )
}