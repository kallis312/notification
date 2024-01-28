import {
  ChakraBaseProvider,
  theme as chakraTheme,
  extendBaseTheme,
  type ThemeConfig
} from '@chakra-ui/react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'

const { Button, Input } = chakraTheme.components
axios.defaults.baseURL = 'http://192.168.143.55:6005/api/v1'
axios.defaults.headers.common['']

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
  <ChakraBaseProvider theme={theme}>
    <App />
  </ChakraBaseProvider>
)
