import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from '@/models/userModel'
import {connect} from '@/db/dbConfig' 

connect()

export async function GET(req:NextRequest){
    try {
        const userID = await getDataFromToken(req)
        const user = await User.findOne({_id:userID}).select('-password')
        return NextResponse.json({
            message:'User found',
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:400})
    }
}