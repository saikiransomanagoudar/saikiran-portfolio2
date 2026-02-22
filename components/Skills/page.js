import {Box, Stack, useMediaQuery} from '@mui/material'
import {TitleTypography, DescriptionTypography} from '../commons/commons'
import Line from '../commons/line'
import UserProfile from '../profile'
import SkillCategory from './category'

import {useRef, useEffect, useState, useCallback} from 'react'
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
  // const scrollContainerRef = useRef(null)
  // const [scrollProgress, setScrollProgress] = useState(0)
  // const [isDragging, setIsDragging] = useState(false)
  // const [startX, setStartX] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // useEffect(() => {
  //   const container = scrollContainerRef.current
  //   if (!container || isMobile) return

  //   const handleScroll = () => {
  //     const scrollWidth = container.scrollWidth - container.clientWidth
  //     const progress = scrollWidth > 0 ? container.scrollLeft / scrollWidth : 0
  //     setScrollProgress(progress)
  //   }

  //   container.addEventListener('scroll', handleScroll)
  //   handleScroll()

  //   return () => container.removeEventListener('scroll', handleScroll)
  // }, [isMobile])

  // const handleSliderMouseDown = (e) => {
  //   setIsDragging(true)
  //   setStartX(e.clientX)
  // }

  // const handleSliderMouseMove = useCallback((e) => {
  //   if (!isDragging || !scrollContainerRef.current) return
  //   
  //   const container = scrollContainerRef.current
  //   const sliderWidth = 200 // Width of the slider track
  //   const deltaX = e.clientX - startX
  //   const scrollDelta = (deltaX / sliderWidth) * (container.scrollWidth - container.clientWidth)
  //   
  //   container.scrollLeft += scrollDelta
  //   setStartX(e.clientX)
  // }, [isDragging, startX])

  // const handleSliderMouseUp = useCallback(() => {
  //   setIsDragging(false)
  // }, [])

  // useEffect(() => {
  //   if (isDragging) {
  //     document.addEventListener('mousemove', handleSliderMouseMove)
  //     document.addEventListener('mouseup', handleSliderMouseUp)
  //     return () => {
  //       document.removeEventListener('mousemove', handleSliderMouseMove)
  //       document.removeEventListener('mouseup', handleSliderMouseUp)
  //     }
  //   }
  // }, [isDragging, handleSliderMouseMove, handleSliderMouseUp])
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
        <Stack 
          // ref={scrollContainerRef}
          width="100%" 
          spacing={2} 
          direction={isMobile ? 'column' : 'row'}
          // sx={{
          //   overflowX: isMobile ? 'visible' : 'auto',
          //   flexWrap: isMobile ? 'wrap' : 'nowrap',
          //   '&::-webkit-scrollbar': {
          //     display: 'none',
          //   },
          //   scrollbarWidth: 'none',
          //   msOverflowStyle: 'none',
          // }}
        >
          {Object.keys(UserProfile.skills).map((category, index) => (
            <SkillCategory
              key={index}
              category={category}
              skills={UserProfile.skills[category]}
            />
          ))}
        </Stack>
        
        {/* {!isMobile && (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={4}
          >
            <Box
              position="relative"
              width="200px"
              height="6px"
              bgcolor="rgba(255, 255, 255, 0.1)"
              borderRadius="3px"
              sx={{
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: 'background-color 0.3s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                }
              }}
              onMouseDown={handleSliderMouseDown}
            >
              <Box
                position="absolute"
                left={`${scrollProgress * 100}%`}
                top="50%"
                width="40px"
                height="12px"
                bgcolor="primary.main"
                borderRadius="6px"
                sx={{
                  transform: 'translate(-50%, -50%)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transition: isDragging ? 'none' : 'left 0.1s, box-shadow 0.3s',
                  boxShadow: isDragging 
                    ? '0 0 20px rgba(255, 64, 129, 0.6)' 
                    : '0 0 10px rgba(255, 64, 129, 0.4)',
                  '&:hover': {
                    boxShadow: '0 0 20px rgba(255, 64, 129, 0.8)',
                  }
                }}
              />
            </Box>
          </Box>
        )} */}
      </Stack>
    </Box>
  )
}

export default Skills
