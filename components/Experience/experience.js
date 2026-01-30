import React from 'react'
import {Box, Stack, Typography, useMediaQuery} from '@mui/material'
import {motion} from 'framer-motion'
import {slideFromLeftVariants} from '@/components/commons/variants'

const Experience = ({job, index, controls}) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate={controls}
      variants={slideFromLeftVariants}
      transition={{delay: 0.3 + index * 0.2}}
      sx={{
        width: '100%',
        padding: isMobile ? '2rem 1rem' : '2.5rem',
        borderRadius: '8px',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Stack direction="column" spacing={2}>
        {/* Header with Title and Date */}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'flex-start' : 'center'}
          spacing={isMobile ? 1 : 0}
        >
          <Typography
            sx={{
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {job.title}
          </Typography>
          <Typography
            sx={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            {job.dates}
          </Typography>
        </Stack>

        {/* Company and Location */}
        <Typography
          sx={{
            fontSize: isMobile ? '14px' : '16px',
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          {job.company}, {job.location}
        </Typography>

        {/* Responsibilities */}
        <Box component="ul" sx={{margin: 0, paddingLeft: isMobile ? '1.2rem' : '1.5rem'}}>
          {job.responsibilities.map((responsibility, idx) => (
            <Box
              component="li"
              key={idx}
              sx={{
                marginBottom: '0.8rem',
                '&::marker': {
                  color: 'primary.main',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  color: 'text.primary',
                }}
              >
                {responsibility}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

export default Experience
