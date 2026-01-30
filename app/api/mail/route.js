import fetch from 'node-fetch'
import nodemailer from 'nodemailer'

export async function POST(request) {
  // Parse the request body
  const {name, email, message, captchaToken} = await request.json()

  // Validate inputs
  if (!name || !email || !message) {
    return Response.json(
      {error: 'Please fill all the fields!'},
      {status: 400}
    )
  }

  // Verify captcha
  try {
    await verifyCaptcha(captchaToken)
  } catch (error) {
    return Response.json(
      {error: 'Failed Captcha'},
      {status: 400}
    )
  }

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    // Email to yourself with contact details
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Request from ${name}`,
      html: `
        <h3>Sender Information</h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `,
    })

    // Confirmation email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your message has been sent',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting me! I will get back to you as soon as possible.</p>
        <p>Best,<br/>Saikiran</p>
      `,
    })

    return Response.json({message: 'Message sent successfully'})
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json(
      {error: 'An error occurred while sending the email'},
      {status: 500}
    )
  }
}

async function verifyCaptcha(token) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    },
  )

  const data = await response.json()

  if (data.success) {
    return 'success!'
  } else {
    throw new Error('Failed Captcha')
  }
}
