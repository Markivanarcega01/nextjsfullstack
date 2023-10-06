import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        //create a hashed token
        const hashToken = await bcryptjs.hash(userID.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });
        const mailOptions = {
            from: 'ivan@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashToken}">here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}