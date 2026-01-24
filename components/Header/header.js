import {Box, Stack, useMediaQuery} from '@mui/material'
import {motion, useAnimation, useInView} from 'framer-motion'
import {useRef, useEffect, useMemo} from 'react'
import LinkIcons from './icons'
import Navigation from './navigation'
import Line from '../commons/line'

const MotionStack = motion(Stack) // Create a motion component from Stack

const Header = ({position}) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const controls = useAnimation() // Controls for animation
  const ref = useRef(null) // Reference for the component
  const inView = useInView(ref) // Checks if component is in view

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  // Using useMemo to avoid unnecessary recalculations
  const stackStyles = useMemo(
    () => ({
      direction: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: isMobile ? '10vh' : '100px',
      bgcolor: 'background.default',
      position: position === 'top' ? 'absolute' : 'relative',
      top: position === 'top' ? 0 : 'auto',
      sx: {
        left: 0,
        right: 0,
        width: '100%',
      },
    }),
    [position, isMobile],
  ) // Dependencies

  return (
    <MotionStack {...stackStyles} ref={ref}>
      {position === 'bottom' && <Line nodot />}
      <LinkIcons inView={inView} />
      <Navigation inView={inView} direction={position} />
    </MotionStack>
  )
}

export default Header
