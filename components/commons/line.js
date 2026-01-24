import {Box} from '@mui/material'
import {styled} from '@mui/system'

// Styled components for cleaner structure
const StyledLineContainer = styled(Box)({
  position: 'absolute',
  width: '1%',
  height: '100%',
  left: '5%',
  bottom: 0,
})

const StyledVerticalLine = styled(Box)(({theme}) => ({
  position: 'absolute',
  height: '100%',
  left: '50%',
  width: '2px',
  transform: 'translateX(-50%)',
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
}))

const StyledDot = styled(Box)(({theme}) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  top: `calc(10vh + 16px)`,
  width: '17px',
  height: '17px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
}))

const Line = ({nodot}) => {
  return (
    <StyledLineContainer>
      {/* Vertical Line */}
      <StyledVerticalLine />

      {/* Dot on vertical line 10% from the top */}
      {!nodot && <StyledDot />}
    </StyledLineContainer>
  )
}

export default Line
