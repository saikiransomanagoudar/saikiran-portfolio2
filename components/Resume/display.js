import {Box, Stack} from '@mui/material'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {toolbarPlugin} from '@react-pdf-viewer/toolbar'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/toolbar/lib/styles/index.css'

import {ColorModeContext} from '@/app/theme'
import {useContext} from 'react'

const Display = () => {
  const toolbarPluginInstance = toolbarPlugin()
  const {renderDefaultToolbar, Toolbar} = toolbarPluginInstance

  const {theme} = useContext(ColorModeContext)

  const transform = (slot) => ({
    ...slot,
    // These slots will be empty
    GoToFirstPage: () => <></>,
    GoToLastPage: () => <></>,
    GoToNextPage: () => <></>,
    GoToPreviousPage: () => <></>,
    Open: () => <></>,
    Rotate: () => <></>,
    ShowProperties: () => <></>,
    SwitchScrollMode: () => <></>,
    SwitchSelectionMode: () => <></>,
    SwitchTheme: () => <></>,
  })

  return (
    <Stack direction="column" width="100%" height="100%">
      <Box
        className={`rpv-core__viewer rpv-core__viewer--${theme}`}
        sx={{
          alignItems: 'center',
          backgroundColor: theme === 'dark' ? '#292929' : '#eee',
          borderBottomColor: theme === 'dark' ? '#000' : 'rgba(0, 0, 0, 0.1)',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          display: 'flex',
          padding: '.25rem',
        }}
      >
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
      </Box>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          theme={theme}
          fileUrl="/Saikiran_Somanagoudar_Resume.pdf"
          plugins={[toolbarPluginInstance]}
        />
      </Worker>
    </Stack>
  )
}

export default Display
