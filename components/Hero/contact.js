import {Button, Stack, Modal, TextField, CircularProgress} from '@mui/material'
import {DescriptionTypography, TitleTypography} from '../commons/commons'
import {useState, useRef} from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import ReCAPTCHA from 'react-google-recaptcha'

// Function to validate email
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return re.test(String(email).toLowerCase())
}

const Contact = ({open, handleClose}) => {
  // State hooks for form inputs and additional states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState({
    status: 'idle', // 'idle', 'inputError', 'loading', 'success', 'error'
    errors: {name: '', email: '', message: ''},
  })
  const recaptchaRef = useRef(null)

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    let errors = {}
    if (!name) errors.name = 'Name is required'
    if (!email || !validateEmail(email))
      errors.email = 'A valid email is required'
    if (!message) errors.message = 'Message is required'

    const captchaToken = recaptchaRef.current.getValue() // Get the current value of captcha
    if (!captchaToken) errors.captcha = 'Captcha is required'

    if (Object.keys(errors).length > 0) {
      setState({status: 'inputError', errors})
      return
    }

    // If no errors, proceed to send the email
    setState({status: 'loading', errors: {}})

    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, message, captchaToken}),
      })
      const data = await response.json()

      if (response.ok) {
        setState({status: 'success', errors: {}, message: data.message}) // Set success
        setName('')
        setEmail('')
        setMessage('')
      } else {
        // Handle errors from the server (like failed captcha or server-side validation)
        setState({
          status: 'error',
          errors: {
            ...state.errors,
            server: data.error || 'Failed to send message',
          },
        })
      }
    } catch (error) {
      // Handle network errors or other unforeseen errors
      setState({
        status: 'error',
        errors: {
          ...state.errors,
          server: 'Unexpected Error Occurred: Please try again later',
        },
      })
    }
  }

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleMessageChange = (e) => setMessage(e.target.value)

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        setState({status: 'idle', errors: {}})
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        width="400px"
        minHeight="400px"
        borderRadius="10px"
        padding="24px"
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent={
          state.status === 'success' ||
          state.status === 'error' ||
          state.status === 'loading'
            ? 'center'
            : 'flex-start'
        }
        backgroundColor="background.paper"
        spacing={2}
      >
        {(state.status === 'inputError' || state.status === 'idle') && (
          <>
            <TitleTypography>Get In Touch</TitleTypography>
            <TextField
              error={!!state.errors.name}
              helperText={state.errors.name}
              value={name}
              onChange={handleNameChange}
              label="Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              error={!!state.errors.email}
              helperText={state.errors.email}
              value={email}
              onChange={handleEmailChange}
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              error={!!state.errors.message}
              helperText={state.errors.message}
              value={message}
              onChange={handleMessageChange}
              label="Message"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
            />
            <Stack>
              {
                // If captcha is not verified, show error
                state.status === 'inputError' && (
                  <DescriptionTypography
                    sx={{
                      color: 'error.main',
                      fontSize: ' 12px',
                    }}
                  >
                    {state.errors.captcha}
                  </DescriptionTypography>
                )
              }
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
              />
            </Stack>

            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={state.status === 'loading'}
              sx={{
                width: '100px',
                borderRadius: '72px',
                textTransform: 'none',
                marginTop: '20px',
              }}
            >
              Send
            </Button>
          </>
        )}
        {state.status === 'loading' && (
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <TitleTypography align="center">Loading</TitleTypography>
          </Stack>
        )}
        {state.status === 'success' && (
          <Stack alignItems="center" spacing={2}>
            <CheckCircleIcon color="success" sx={{fontSize: 45}} />
            <TitleTypography align="center">{state.message}</TitleTypography>
            <DescriptionTypography align="center">
              Please check your email/spam folder for a confirmation email.
            </DescriptionTypography>
          </Stack>
        )}
        {state.status === 'error' && (
          <Stack alignItems="center" spacing={2}>
            <ErrorIcon color="error" sx={{fontSize: 45}} />
            <TitleTypography align="center">
              {state.errors.server}
            </TitleTypography>
          </Stack>
        )}
      </Stack>
    </Modal>
  )
}
// Do the contact thing!! Finish it!!!
export default Contact
