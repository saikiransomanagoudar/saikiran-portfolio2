import {Avatar, Box, Button, Stack, useMediaQuery} from '@mui/material'
import {TitleTypography, DescriptionTypography} from '../commons/commons'
import {useState, useEffect, useRef} from 'react'
import UserProfile from '../profile'
import Line from './line'
import Contact from './contact'
import {motion} from 'framer-motion'

const MotionAvatar = motion(Avatar)
const MotionButton = motion(Button)

const Hero = () => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      minHeight="100vh"
      width="100%"
      paddingY="10vh"
      paddingX="10vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bgcolor="background.default"
      ref={ref}
    >
      <Contact open={open} handleClose={handleClose} />
      <Stack
        direction={isMobile ? 'column' : 'row'}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        spacing={isMobile ? 2 : 10}
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={stackVariants}
        transition={{duration: 0.5}}
      >
        <Stack direction="column" spacing={2}>
          <TitleTypography>
            Hello There! I&apos;m&nbsp;
            <TitleTypography
              component={motion.span}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{duration: 0.5, delay: 0.5}}
              sx={{
                color: 'text.secondary',
              }}
            >
              {UserProfile.profile.name}
            </TitleTypography>
          </TitleTypography>
          <DescriptionTypography
            component={motion.span}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{duration: 0.5, delay: 1}}
          >
            {UserProfile.profile.description}
          </DescriptionTypography>
          <MotionButton
            variant="contained"
            onClick={handleOpen} // Opens the modal when clicked
            initial="hidden"
            animate="visible"
            variants={contactButtonVariants}
            transition={{duration: 0.5, delay: 1.5}}
            sx={{
              width: '100px',
              borderRadius: '72px',
              textTransform: 'none',
            }}
          >
            Contact
          </MotionButton>
        </Stack>
        <MotionAvatar
          alt="profile"
          src={'/profile.png'}
          sx={{
            width: '300px',
            height: '300px',
          }}
          initial="hidden"
          animate="visible"
          variants={avatarVariants}
          transition={{duration: 0.5, delay: isMobile ? 2 : 0.5}}
        />
      </Stack>
      <Line />
    </Box>
  )
}

const stackVariants = {
  hidden: {opacity: 0, translateY: 50},
  visible: {opacity: 1, translateY: 0},
}

const textVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0},
}

const contactButtonVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0},
}

const avatarVariants = {
  hidden: {opacity: 0, scale: 0.8},
  visible: {opacity: 1, scale: 1},
}

export default Hero
