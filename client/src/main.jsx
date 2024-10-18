import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HeaderJustIcon from './components/headerJustIcon/HeaderJustIcon'
import LoginForm from './components/loginForm/LoginForm'
import SimpleFooter from './components/simpleFooter/SimpleFooter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderJustIcon />
    <LoginForm />
    <SimpleFooter />
  </StrictMode>,
)
