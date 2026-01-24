import {Box} from '@mui/material'
import {useCallback} from 'react'
import {motion, useAnimation} from 'framer-motion'
import {useInView} from 'framer-motion'
import {useRef, useEffect} from 'react'

const MotionBox = motion(Box)
const motionBoxStyle = {
  height: '2px',
  width: '100%',
  position: 'absolute',
  left: 0,
  top: '35%',
  bgcolor: 'text.primary',
  initial: 'hidden',
  variants: {
    visible: {width: '100%'},
    hidden: {width: '0%'},
  },
  transition: {duration: 1, ease: 'easeInOut'},
}

const Timeline = () => {
  const controls = useAnimation()
  const ref = useRef(null)

  // useInView is a custom hook from 'framer-motion'
  const inView = useInView(ref)

  // useCallback ensures this function is memoized and not recreated on every render
  const startAnimation = useCallback(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView]) // Ensure dependencies are correctly listed

  useEffect(() => {
    startAnimation()
  }, [startAnimation]) // Reacting only to changes in startAnimation

  return <MotionBox {...motionBoxStyle} ref={ref} animate={controls} />
}

export default Timeline
