import React, {useEffect, useRef} from 'react'
import {Box, Stack, useMediaQuery} from '@mui/material'
import {motion, useAnimation, useInView} from 'framer-motion'

import {TitleTypography, DescriptionTypography} from '../commons/commons'
import Line from '../commons/line'
import UserProfile from '../profile'
import ExperienceItem from './experience'

import {slideFromLeftVariants} from '@/components/commons/variants'

const Experience = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {once: true, amount: 0.2})

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <Box
      width="100%"
      minHeight={isMobile ? 'auto' : '100vh'}
      paddingY="10vh"
      paddingX="10vw"
      position="relative"
      bgcolor="background.default"
      id="experience-section"
      ref={ref}
    >
      <Line />
      <Stack
        width="100%"
        height="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <TitleTypography
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={slideFromLeftVariants}
        >
          Professional Experience
        </TitleTypography>
        {/* <DescriptionTypography
          maxWidth="650px"
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={slideFromLeftVariants}
          transition={{delay: 0.2}}
        >
          Building scalable web applications and leading development teams across diverse industries
        </DescriptionTypography> */}
        <Stack
          direction="column"
          width="100%"
          spacing={4}
          sx={{marginTop: '3rem'}}
        >
          {UserProfile.experience.map((job, index) => (
            <ExperienceItem key={index} job={job} index={index} controls={controls} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Experience
