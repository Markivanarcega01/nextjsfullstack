import { connect } from '@/db/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:'User does not exist'
            },{status:400})
        } 
        await sendEmail({ email, emailType: 'RESET', userID:user._id  })
        return NextResponse.json({user:user})
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}

