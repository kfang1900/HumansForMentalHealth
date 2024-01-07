import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const formData = await new Response(req.body).json()
    const { name, email, message, recipientEmail } = formData
    console.log(name, email, message, recipientEmail)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kfang1900@gmail.com",
        pass: "tqrp myra hqrn jwaj",
      },
    })

    const mailOptions = {
      from: email,
      to: recipientEmail,
      subject: `(Humans for Mental Health) ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    try {
      await transporter.sendMail(mailOptions)
      return NextResponse.json(
        { message: "Email Sent", success: true },
        { status: 200 }
      )
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        { message: "Email failed to send" },
        { status: 500 }
      )
    }
  } else {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
  }
}
