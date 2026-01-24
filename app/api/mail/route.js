import fetch from 'node-fetch'

export async function POST(request) {
  // Parse the request body

  const {name, email, message, captchaToken} = await request.json()
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = 'billzhang.tech'
  const mgDomain = 'mg.billzhang.tech' // Replace with your domain
  const mailgunUrl = `https://api.mailgun.net/v3/${mgDomain}/messages`

  try {
    await verifyCaptcha(captchaToken)
  } catch (error) {
    return Response.json(
      {error: 'Failed Captcha'},
      {
        status: 400,
      },
    )
  }

  const formDataOne = new URLSearchParams()
  formDataOne.append('from', `Bill Zhang <no-reply@${domain}>`)
  formDataOne.append('to', 'billzhangsc@gmail.com')
  formDataOne.append('subject', 'New Contact Request')
  formDataOne.append(
    'text',
    `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  )

  const formDataTwo = new URLSearchParams()
  formDataTwo.append('from', `Bill Zhang <no-reply@${domain}>`)
  formDataTwo.append('to', email)
  formDataTwo.append('subject', 'Your message has been sent')
  formDataTwo.append(
    'text',
    `Hi ${name},\n\nThank you for contacting me! I will get back to you as soon as possible.\n\nBest,\nBill`,
  )

  try {
    // Email sent to your address
    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString(
          'base64',
        )}`,
      },
      body: formDataOne,
    })

    if (!response.ok) {
      throw new Error('An error occurred while sending the email')
    }

    // Email sent to the user
    const responseTwo = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString(
          'base64',
        )}`,
      },
      body: formDataTwo,
    })

    if (!responseTwo.ok) {
      throw new Error('An error occurred while sending the confirmation email')
    }

    return Response.json({message: 'Message sent successfully'})
  } catch (error) {
    return Response.json(
      {error: 'An error occurred while sending the email'},
      {
        status: 500,
      },
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
