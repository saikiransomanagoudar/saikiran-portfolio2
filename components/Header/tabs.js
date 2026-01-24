import {Stack} from '@mui/material'
import {memo} from 'react'
import {TitleTypography} from '../commons/commons'

const StyledTypography = ({children, onClick}) => {
  return (
    <TitleTypography
      sx={{
        fontSize: '20px',
        textTransform: 'uppercase',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {children}
    </TitleTypography>
  )
}

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
}

const Tabs = () => (
  <Stack direction="row" spacing={2} alignItems="center">
    <StyledTypography onClick={() => scrollToSection('projects-section')}>
      Projects
    </StyledTypography>
    <StyledTypography>/</StyledTypography>
    <StyledTypography onClick={() => scrollToSection('education-section')}>
      Education
    </StyledTypography>
    <StyledTypography>/</StyledTypography>
    <StyledTypography onClick={() => scrollToSection('skills-section')}>
      Skills
    </StyledTypography>
    <StyledTypography>/</StyledTypography>
    <StyledTypography onClick={() => scrollToSection('resume-section')}>
      Resume
    </StyledTypography>
  </Stack>
)

export default memo(Tabs)
