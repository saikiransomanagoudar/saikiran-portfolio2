import {Box, Stack} from '@mui/material'
import {DescriptionTypography} from '../commons/commons'
import {skillIcons, skillColors} from './iconMapping'

import {motion, useAnimation} from 'framer-motion'
import {useEffect} from 'react'

const Skill = ({name, percentage, index, inView}) => {
  const controls = useAnimation()
  const IconComponent = skillIcons[name]

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <MotionStack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
      variants={skillVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      sx={{
        width: '100%',
        padding: '8px 0',
      }}
    >
      {IconComponent && (
        <Box
          sx={{
            fontSize: '40px',
            color: skillColors[name] || 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            transition: 'transform 0.3s ease, color 0.3s ease',
            '&:hover': {
              transform: 'scale(1.15)',
            },
          }}
        >
          <IconComponent />
        </Box>
      )}
      <DescriptionTypography
        sx={{
          fontSize: '16px',
          lineHeight: 1.2,
        }}
      >
        {name}
      </DescriptionTypography>
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
