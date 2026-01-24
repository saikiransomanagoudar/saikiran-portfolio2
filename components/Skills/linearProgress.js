import {useEffect} from 'react'
import {LinearProgress, useTheme} from '@mui/material'
import {useState} from 'react'
const AnimatedLinearProgress = ({targetValue, inView, index}) => {
  const [progress, setProgress] = useState(0)
  const theme = useTheme()

  const staggerDelay = (0.2 * index + 0.5) * 1000

  useEffect(() => {
    if (inView) {
      const intervalDuration = 20 // Interval duration in ms
      const animationDuration = 2000 // Total animation duration in ms
      const totalSteps = animationDuration / intervalDuration
      let step = 0

      //Cosine Parametric Function
      const cosineBlend = (t) => {
        return -1 * Math.cos(Math.PI * 0.5 * t) ** 2 + 1
      }

      // ParametricBlend function
      const parametricBlend = (t) => {
        let sqr = t ** 4
        return sqr / (2.0 * (sqr - t ** 2) + 1.0)
      }

      // Exponential Parametric Function
      const expoBlend = (t) => {
        if (t === 0) return 0
        if (t === 1) return 1
        if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * --t)
        return 0.5 * (-Math.pow(2, -10 * --t) + 2)
      }

      setTimeout(() => {
        const interval = setInterval(() => {
          const ratio = step / totalSteps
          const easedRatio = expoBlend(ratio)
          setProgress(easedRatio * targetValue)
          step++

          if (step >= totalSteps) {
            clearInterval(interval)
          }

          return () => clearInterval(interval) // Cleanup
        }, intervalDuration)

        return () => clearInterval(interval) // Cleanup
      }, staggerDelay)
    }
  }, [inView, targetValue, staggerDelay])

  return (
    <LinearProgress
      variant="determinate"
      aria-label="skill-progress-bar"
      value={progress}
      sx={{
        height: '20px',
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: '10px',
        '& .MuiLinearProgress-bar': {
          borderRadius: '10px',
        },
      }}
    />
  )
}

export default AnimatedLinearProgress
