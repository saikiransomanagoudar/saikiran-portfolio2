import {Box, Stack} from '@mui/material'
import Line from '../commons/line'
import Display from './display'
import {TitleTypography} from '../commons/commons'
import {useRef, useEffect} from 'react'
import {motion, useAnimation, useInView} from 'framer-motion'
import {slideFromLeftVariants} from '@/components/commons/variants'

const Resume = () => {
  const controls = useAnimation() // Animation controls
  const ref = useRef(null) // Reference to the component
  const inView = useInView(ref) // Tracks whether component is in viewport

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  return (
    <Box
      width="100%"
      paddingTop="10vh"
      paddingX="10vw"
      position="relative"
      bgcolor="background.default"
      id="resume-section"
      ref={ref}
    >
      <Line />
      <Stack
        width="100%"
        height="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
        overflow={'hidden'}
      >
        <TitleTypography
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={slideFromLeftVariants}
        >
          Resume
        </TitleTypography>
        <Display />
      </Stack>
    </Box>
  )
}
export default Resume
