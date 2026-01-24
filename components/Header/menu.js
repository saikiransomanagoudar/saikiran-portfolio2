import {motion} from 'framer-motion'
import {Box, Stack, Drawer} from '@mui/material'
import {useEffect, memo, useCallback, useMemo} from 'react'
import {useMenu} from '../menuContext'
import {AnimatePresence} from 'framer-motion'
import {TitleTypography} from '../commons/commons'

const AnimatedTab = ({sectionId, onClick, index}) => {
  const {direction} = useMenu()

  const motionVariants = useMemo(() => {
    const reverseStaggerDelay = (4 - index - 1) * 0.05
    return {
      hidden: {
        opacity: 0,
        rotateY: -90, // Flip from the right
      },
      visible: {
        opacity: 1,
        rotateY: 0, // End facing the viewer
        transition: {
          duration: 0.4,
          delay: direction != 'top' ? reverseStaggerDelay : index * 0.05,
          ease: 'easeInOut',
        },
      },
      exit: {
        opacity: 0,
        rotateY: -90, // Flip to the right
        transition: {
          duration: 0.4,
          delay: direction != 'top' ? index * 0.05 : reverseStaggerDelay,
          ease: 'easeInOut',
        },
      },
    }
  }, [direction, index])

  return (
    <TitleTypography
      component={motion.div}
      key={sectionId}
      onClick={onClick}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={motionVariants}
      sx={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'right',
        fontSize: '40px',
        textTransform: 'uppercase',
      }}
    >
      {sectionId.split('-')[0]}
    </TitleTypography>
  )
}

const FullScreenMenu = () => {
  const {menuOpen, toggleMenu, direction} = useMenu()

  const scrollToSection = useCallback(
    (sectionId) => {
      toggleMenu(false)

      // Use a timeout to delay the scrolling action until after the menu has closed
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          // Scroll to the section after the menu has closed and main content is reset
          section.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
      }, 500)
    },
    [toggleMenu],
  )

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const Tabs = memo(() => (
    <Stack
      width="100%"
      direction="column"
      spacing={2}
      alignItems="flex-end"
      sx={{
        perspective: '800px',
      }}
    >
      {[
        'projects-section',
        'education-section',
        'skills-section',
        'resume-section',
      ].map((sectionId, index) => (
        <AnimatedTab
          key={sectionId}
          sectionId={sectionId}
          onClick={() => scrollToSection(sectionId)}
          index={index}
        />
      ))}
    </Stack>
  ))
  Tabs.displayName = 'Tabs'

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <Box
            height="76vh"
            width="100vw"
            top="12vh"
            bottom="12vh"
            paddingX="10vw"
            overflow="hidden"
            position="fixed"
            display="flex"
            flexDirection="column"
            justifyContent={direction == 'top' ? 'flex-start' : 'flex-end'}
            alignItems="flex-end"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Tabs />
          </Box>
        )}
      </AnimatePresence>
      <Drawer
        variant="persistent"
        anchor={direction == 'top' ? 'top' : 'bottom'}
        width="100vw"
        height="100vh"
        open={menuOpen}
        onClose={() => toggleMenu(false)}
        transitionDuration={500}
      >
        <Box
          height="100vh"
          width="100vw"
          bgcolor="background.default"
          overflow="hidden"
        />
      </Drawer>
    </>
  )
}

export default FullScreenMenu
