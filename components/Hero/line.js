import {Box, Typography, useMediaQuery} from '@mui/material'
import {motion} from 'framer-motion'

const Line = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      position="absolute"
      width="1%"
      height={isMobile ? '20vh' : '30vh'}
      left="5%"
      bottom={0}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={lineVariants}
      sx={{
        transformOrigin: 'bottom',
      }}
    >
      <Box
        position="absolute"
        height="100%"
        left="50%"
        width="2px"
        sx={{
          bgcolor: 'primary.main',
          transform: 'translateX(-50%)',
        }}
      />
      <Typography
        color="text.primary"
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        sx={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          whiteSpace: 'nowrap',
          marginLeft: '4px',
        }}
        variant="subtitle1"
      >
        SCROLL TO EXPLORE
      </Typography>
    </Box>
  )
}

const lineVariants = {
  visible: {
    scaleY: 1,
    transition: {duration: 0.5, ease: 'easeOut'},
  }, // Visible state
  hidden: {scaleY: 0}, // Hidden state
}

const textVariants = {
  visible: {
    opacity: 1,
    transition: {duration: 0.5, ease: 'easeOut', delay: 0.5},
  }, // Visible state
  hidden: {opacity: 0}, // Hidden state
}

export default Line
