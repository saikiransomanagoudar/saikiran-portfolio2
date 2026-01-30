import {Box, Typography} from '@mui/material'
import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const roles = [
  'Software Engineer',
  'Frontend Developer',
  'Full Stack Developer',
  'AI & ML Integrator',
  'Cloud Practitioner',
]

const RoleHighlighter = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000) // Change role every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '40px',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: {xs: '1.2rem', sm: '1.5rem'},
          fontWeight: 500,
          color: 'text.primary',
          marginRight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        I am a
      </Typography>
      <Box
        sx={{
          display: 'inline-block',
          minWidth: {xs: '200px', sm: '250px'},
          position: 'relative',
          height: '40px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoleIndex}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.4}}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: {xs: '1.2rem', sm: '1.5rem'},
                fontWeight: 700,
                color: 'text.secondary',
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.text.secondary}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap'
              }}
            >
              {roles[currentRoleIndex]}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  )
}

export default RoleHighlighter
