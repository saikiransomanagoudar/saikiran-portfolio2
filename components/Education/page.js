import React, {useEffect, useRef} from 'react'
import {Box, Stack, useMediaQuery} from '@mui/material'
import {motion, useAnimation, useInView} from 'framer-motion'

import {TitleTypography, DescriptionTypography} from '../commons/commons'
import Line from '../commons/line'
import UserProfile from '../profile'
import Timeline from './timeline'
import School from './school'

import {slideFromLeftVariants} from '@/components/commons/variants'

const Education = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Modularized Education Descriptions
  const EducationDescriptions = () => (
    <Stack direction="column">
      {[
        'Masters of Science in Computer Science',
        'Full Stack Web Development, Applied Machine Learning',
      ].map((text, i) => (
        <DescriptionTypography
          key={i}
          maxWidth="650px"
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={slideFromLeftVariants}
          transition={{delay: 0.2}}
        >
          {text}
        </DescriptionTypography>
      ))}
    </Stack>
  )

  return (
    <Box
      width="100%"
      height={isMobile ? 'auto' : '100vh'}
      paddingY="10vh"
      paddingX="10vw"
      position="relative"
      bgcolor="background.default"
      id="education-section"
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
          Education
        </TitleTypography>
        <EducationDescriptions />
        {!isMobile && <Timeline />}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          height={isMobile ? 'auto' : '50vh'}
          width="100%"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={!isMobile ? {position: 'absolute', top: '30%', left: '0%'} : {}}
        >
          {UserProfile.education.map((school, index) => (
            <School key={index} school={school} index={index} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Education
