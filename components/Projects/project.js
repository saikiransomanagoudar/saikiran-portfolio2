'use client'

import {Box, Stack, Button, useMediaQuery} from '@mui/material'
import {useEffect, useRef} from 'react'
import {DescriptionTypography, TitleTypography} from '../commons/commons'
import {motion, useAnimation, useInView} from 'framer-motion'

const projectVariants = {
  hidden: {y: 30, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: {duration: 0.5, ease: 'easeOut'},
  },
}

const MotionBox = motion(Box)

const Project = ({project}) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      minHeight="400px"
      width="100%"
      paddingY="5%"
      paddingX="5%"
      bgcolor="background.paper"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={projectVariants}
    >
      {/*Flex Grow is needed here because setting height 
      to 100% doesn't work if parent doesnt have a set height*/}
      <Stack
        direction={isMobile ? 'column' : 'row'}
        width="100%"
        flexGrow={1}
        spacing={2}
      >
        <Stack
          width={isMobile ? '100%' : '50%'}
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack
            direction="column"
            width="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <TitleTypography
              sx={{
                lineHeight: '111%',
              }}
            >
              {project.name}
            </TitleTypography>
            <Stack direction="row" sx={{flexWrap: 'wrap'}}>
              {project.techStack.map((tech, index) => (
                <DescriptionTypography
                  key={tech}
                  sx={{
                    mr: 0.5, // Adjust the right margin as needed
                    '&::after': {
                      content:
                        index < project.techStack.length - 1 ? "'/'" : "''",
                      marginLeft: 0.5, // Adjust spacing after the slash
                    },
                  }}
                >
                  {tech}
                </DescriptionTypography>
              ))}
            </Stack>
            <DescriptionTypography>{project.description}</DescriptionTypography>
          </Stack>
          <Stack direction="row" spacing={2} marginTop={2}>
            {project.link && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: '137px',
                  textTransform: 'none',
                }}
              >
                <DescriptionTypography
                  sx={{
                    fontSize: '20px',
                  }}
                  onClick={() => window.open(project.link, '_blank')}
                >
                  Demo
                </DescriptionTypography>
              </Button>
            )}

            {project.github && (
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '137px',
                  textTransform: 'none',
                  color: 'white', // Set the text color to white
                  borderColor: 'white', // Set the border color to white
                  ':hover': {
                    borderColor: '#f3f3f3', // Change to a slightly different shade for effect, adjust as needed
                    background: 'rgba(255, 255, 255, 0.1)', // Slight white background on hover
                    color: '#f3f3f3', // Change text color slightly for effect
                  },
                }}
              >
                <DescriptionTypography
                  sx={{
                    fontSize: '20px',
                  }}
                  onClick={() => window.open(project.github, '_blank')}
                >
                  Github
                </DescriptionTypography>
              </Button>
            )}
          </Stack>
        </Stack>

        <VideoPlayer
          videoId={project.code}
          isMobile={isMobile}
          demoUrl={project.link}
        />
      </Stack>
    </MotionBox>
  )
}

const VideoPlayer = ({videoId, isMobile, demoUrl}) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  // Determine the source URL for the iframe
  const iframeSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : demoUrl // Use the demo URL if no videoId is provided

  return (
    <Box
      width={isMobile ? '100%' : '50%'}
      height={isMobile ? '200px' : 'auto'}
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      ref={ref}
      zIndex={5}
    >
      {isInView ? (
        <iframe
          width="100%"
          height="100%"
          src={iframeSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            pointerEvents: videoId ? 'auto' : 'none', // Disable pointer events if no videoId is provided
          }}
        ></iframe>
      ) : (
        <TitleTypography>Loading...</TitleTypography>
      )}
    </Box>
  )
}

export default Project
