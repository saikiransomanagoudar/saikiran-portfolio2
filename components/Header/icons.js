import UserProfile from '@/components/profile'
// import DevpostIcon from '@/public/devpost.svg'
import GithubIcon from '@/public/github.svg'
import LinkedInIcon from '@/public/linkedin.svg'
// import YoutubeIcon from '@public/youtube.svg'
import {Stack} from '@mui/material'
import Image from 'next/image'
import {useEffect} from 'react'
import {useAnimation, motion} from 'framer-motion'
import {textVariants} from '../commons/variants'

const IconSize = 25
const MotionStack = motion(Stack)

const LinkIcons = ({inView}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return (
    <MotionStack
      direction="row"
      spacing={2}
      position="absolute"
      left="10%"
      zIndex={2}
      initial="hidden"
      animate={controls}
      variants={textVariants}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {/* <a
        href={UserProfile.profile.devpost}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={DevpostIcon}
          alt="Devpost"
          height={IconSize}
          width={IconSize}
        />
      </a> */}
      <a
        href={UserProfile.profile.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={GithubIcon}
          alt="Github"
          height={IconSize}
          width={IconSize}
        />
      </a>
      <a
        href={UserProfile.profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={LinkedInIcon}
          alt="LinkedIn"
          height={IconSize}
          width={IconSize}
        />
      </a>
      {/* <a
        href={UserProfile.profile.youtube}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={YoutubeIcon}
          alt="YouTube"
          height={IconSize}
          width={IconSize}
        />
      </a> */}
    </MotionStack>
  )
}

export default LinkIcons
