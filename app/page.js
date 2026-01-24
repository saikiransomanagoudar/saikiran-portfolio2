'use client'
import Hero from '@/components/Hero/page'
import {Box, useMediaQuery, useTheme} from '@mui/material'
import Projects from '@/components/Projects/page'
import {CustomModeThemeProvider} from './theme'
import Education from '@/components/Education/page'
import Skills from '@/components/Skills/page'
import Resume from '@/components/Resume/page'
import Header from '@/components/Header/header'
import {AnimatePresence} from 'framer-motion'
import FullScreenMenu from '@/components/Header/menu'
import {useState, useEffect} from 'react'
import {MenuProvider} from '@/components/menuContext'
import {ClimbingBoxLoader} from 'react-spinners'
import {motion} from 'framer-motion'

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 600px)', {
    noSsr: true, // This option tells useMediaQuery to not use SSR.
  })
  const [loading, setLoading] = useState(true) // loading is true when isMobile is null

  // Once the media query has resolved, set loading to false
  useEffect(() => {
    if (isMobile !== null) {
      setLoading(false)
    }
  }, [isMobile])
  return (
    <CustomModeThemeProvider>
      <MenuProvider>
        <AnimatePresence>
          {loading ? (
            <Loader />
          ) : (
            <Box id="main-content">
              <Header position="top" />
              {isMobile && <FullScreenMenu />}
              <Hero />
              <Projects />
              <Education />
              <Skills />
              <Resume />
              <Header position="bottom" />
            </Box>
          )}
        </AnimatePresence>
      </MenuProvider>
    </CustomModeThemeProvider>
  )
}

const MotionBox = motion(Box)
const Loader = () => {
  const theme = useTheme()
  return (
    <MotionBox
      initial={{opacity: 0}} // Initial state of the component
      animate={{opacity: 1}} // Animate to this state
      exit={{opacity: 0}} // Exit state (when component unmounts)
      transition={{duration: 0.5}} // Duration of the exit animation
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
    >
      <ClimbingBoxLoader color={theme.palette.primary.main} size={30} />
    </MotionBox>
  )
}
