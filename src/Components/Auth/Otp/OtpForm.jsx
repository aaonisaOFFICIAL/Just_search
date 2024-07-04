import React from 'react'
import TextField from "@mui/material/TextField";
import { MdEdit } from "react-icons/md";

const OtpForm = () => {
  return (
    <div className="login-form">
      <div>
        <h3>
          Just <span>Search</span>
        </h3>
        <hr />
        <div>
          <h3>Welcome User</h3>
          <p>Login for a seamless exprience</p>
        </div>
      </div>

      <div className='otp-form'>
        <div>
        <h3><MdEdit /> +919876543210</h3>
        <p>Verification message sent to +91 9876543210</p>
        </div>

        <div>
          <div className='otp-box'>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" /> 
          </div>
          
          <div className='not-recived'>
            <div>
            <h4>Didn't Receive the OTP?</h4>
            <p>Resend OTP</p>
            </div>
          </div>
        </div>
        <button className='otp-btn'>Continue</button>
      </div>
    </div>
  )
}

export default OtpForm