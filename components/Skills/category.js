import {Stack} from '@mui/material'
import {TitleTypography} from '../commons/commons'
import {textVariants} from '../commons/variants'
import Skill from './skill'

import {motion, useAnimation} from 'framer-motion'
import {useInView} from 'framer-motion'
import {useRef, useEffect} from 'react'
const SkillCategory = ({category, skills}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible') // Pass an object with the expected percentage
    }
  }, [controls, inView])
  return (
    <Stack
      direction="column"
      flexGrow={1}
      spacing={2}
      alignContent="center"
      justifyContent="flex-start"
      ref={ref}
    >
      <TitleTypography
        component={motion.span}
        sx={{
          fontSize: '35px',
        }}
        initial="hidden"
        animate={controls}
        variants={textVariants}
      >
        {category[0].toUpperCase() + category.slice(1)}
      </TitleTypography>
      <Stack direction="column" spacing={2} width="100%">
        {skills.map((skill, index) => (
          <Skill
            inView={inView}
            key={index}
            name={skill[0]}
            percentage={skill[1]}
            index={index}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default SkillCategory
