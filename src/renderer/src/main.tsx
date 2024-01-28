import {
  ChakraBaseProvider,
  theme as chakraTheme,
  extendBaseTheme,
  type ThemeConfig
} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'
import React from 'react'

const { Button, Input } = chakraTheme.components

const theme: ThemeConfig = extendBaseTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'none'
      }
    })
  },
  components: {
    Button,
    Input
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>
)
