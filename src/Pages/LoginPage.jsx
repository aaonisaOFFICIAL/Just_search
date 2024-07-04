import React from 'react'
import AuthNavbar from '../Components/Auth/AuthNavbar'
import Loginform from '../Components/Auth/Login/Loginform'
import LoginSvg from '../Components/Auth/Login/LoginSvg'

const LoginPage = () => {
  return (
    <>
    <AuthNavbar />
    <div className="login-page">
      <LoginSvg />
      <Loginform />
    </div>
    </>
  )
}

export default LoginPage
