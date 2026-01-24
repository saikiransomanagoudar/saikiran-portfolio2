import {Box, Stack} from '@mui/material'
import {DescriptionTypography} from '../commons/commons'
import AnimatedLinearProgress from './linearProgress'

import {motion, useAnimation} from 'framer-motion'
import {useEffect} from 'react'

const Skill = ({name, percentage, index, inView}) => {
  const value = parseInt(percentage)

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible') // Pass an object with the expected percentage
    }
  }, [controls, inView, value])

  return (
    <MotionStack
      direction="column"
      width="100%"
      variants={skillVariants} // Use the defined variants
      initial="hidden"
      animate={controls}
      custom={index}
    >
      <DescriptionTypography
        sx={{
          fontSize: '18px',
        }}
      >
        {name}
      </DescriptionTypography>
      <Box position="relative" width="100%">
        <AnimatedLinearProgress
          inView={inView}
          targetValue={value}
          index={index}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DescriptionTypography
            sx={{
              fontSize: '16px',
            }}
          >
            {percentage}
          </DescriptionTypography>
        </Box>
      </Box>
    </MotionStack>
  )
}

const MotionStack = motion(Stack)
const skillVariants = {
  hidden: {opacity: 0, y: 20},
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.5 + index * 0.2,
    },
  }),
}

export default Skill
