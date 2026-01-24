import {Box, Stack, useMediaQuery} from '@mui/material'
import {TitleTypography, DescriptionTypography} from '../commons/commons'
import Line from '../commons/line'
import UserProfile from '../profile'
import SkillCategory from './category'

import {useRef, useEffect} from 'react'
import {motion, useAnimation, useInView} from 'framer-motion'
import {
  slideFromLeftVariants,
  textVariants,
} from '@/components/commons/variants'

const Skills = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')
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
      paddingY="10vh"
      paddingX="10vw"
      position="relative"
      bgcolor="background.default"
      id="skills-section"
      ref={ref}
    >
      <Line />
      <Stack
        width="100%"
        height="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <TitleTypography
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={slideFromLeftVariants}
        >
          Skills
        </TitleTypography>
        <DescriptionTypography
          maxWidth="650px"
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{delay: 0.2}}
        >
          Throughout my career, I have gained significant experience and skills
          in various areas of this field.
        </DescriptionTypography>
        <Stack width="100%" spacing={2} direction={isMobile ? 'column' : 'row'}>
          {Object.keys(UserProfile.skills).map((category, index) => (
            <SkillCategory
              key={index}
              category={category}
              skills={UserProfile.skills[category]}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Skills
