import React from 'react'
import HeaderJustIcon from '../components/headerJustIcon/HeaderJustIcon'
import LoginForm from '../components/loginForm/LoginForm'
import SimpleFooter from '../components/simpleFooter/SimpleFooter'

export default function LogInPage() {
  return (
    <div>
        <div className="flex flex-col min-h-screen">
            <HeaderJustIcon />
            <div className="flex-grow">
                <LoginForm />
            </div>
            <SimpleFooter />
        </div>
    </div>
  )
}
