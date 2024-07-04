import React from 'react'
import OtpSvg from '../Components/Auth/Otp/OtpSvg'
import OtpForm from '../Components/Auth/Otp/OtpForm'
import AuthNavbar from '../Components/Auth/AuthNavbar'

const OtpPage = () => {
  return (
    <>
    <AuthNavbar />
    <div className="otp-page">
        <OtpSvg />
        <OtpForm />
    </div>
    </>
  )
}

export default OtpPage