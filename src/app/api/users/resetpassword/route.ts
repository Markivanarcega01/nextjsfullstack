import { connect } from '@/db/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
    try {
        const { password,token } = await req.json()
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}}) 
        if(!user){
            return NextResponse.json({
                error:'Invalid token'
            },{status:400})
        }
        console.log(user)
        user.password = hashedPassword
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined
        await user.save()
        return NextResponse.json({success:true})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
