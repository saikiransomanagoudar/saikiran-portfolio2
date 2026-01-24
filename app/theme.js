'use client'

import {ThemeProvider, createTheme} from '@mui/material/styles'
import {createContext, useState, useMemo} from 'react'

import {Kanit} from 'next/font/google'
const kanit = Kanit({subsets: ['latin'], weight: ['400', '600']}) // Customize weights as needed

const ColorModeContext = createContext({toggleColorMode: () => {}})

const CustomModeThemeProvider = ({children}) => {
  const [mode, setMode] = useState('dark')
  const colorMode = useMemo(
    () => ({
      theme: mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [mode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#7e57c2' : '#9D00FF',
          },
          secondary: {
            main: mode === 'light' ? '#b39ddb' : '#9575cd',
          },
          background: {
            default: mode === 'light' ? '#fafafa' : '#000000',
            paper: mode === 'light' ? '#ffffff' : '#171717;',
            form: mode === 'light' ? '#ffffff' : '#606060;',
          },
          text: {
            primary: mode === 'light' ? '#212121' : '#e0e0e0',
            secondary: mode === 'light' ? '#AA43F9' : '#AA43F9',
          },
        },
        typography: {
          ...kanit.style,
          fontStyle: 'normal',
          lineHeight: 'normal',
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export {ColorModeContext, CustomModeThemeProvider}
