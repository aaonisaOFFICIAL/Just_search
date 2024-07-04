import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../Config";

const Loginform = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [confirm ,setConfirm] = useState(null)
  const [otp, setOtp] = useState("")

  //steps
  const sendOtp = async() => {
    const mobile = "+91" + number
    try{
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {'size': 'invisible' })
      const confirmation = await signInWithPhoneNumber(auth, mobile,recaptcha )
      console.log(confirmation)
      
    }
    catch(err){
      console.error(err)
    }
  }

  const nextStep = () => {
    try{
      sendOtp()
      
    }
    catch(err){
      console.error(err)
    }
    setCurrentStep((prev) => prev + 1)
  }
  const creatingUser = () => {
    
    try{
      const userdata = {
        name:name,
        number:number
      }
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <>
    {
      currentStep === 1 && (
        <div className="login-form">
      <div>
        <h3>
          Just <span>Search</span>
        </h3>
        <hr />
        <div>
          <h3>Welcome </h3>
          <p>Login for a seamless exprience</p>
        </div>
      </div>

      <form>
        <TextField id="standard-basic" label="Name" variant="standard" style={{width:"100%"}} onChange={(e) => setName(e.target.value)}/>

        <TextField
          id="standard-basic"
          label="Mobile Number"
          variant="standard"
          type="number"
          style={{width:"100%"}}
          onChange={(e) => setNumber(e.target.value)}
        />
      </form>
      <div className="login-btn">
      <button onClick={nextStep}>Contiue</button>
      <div id="recaptcha"></div>
      </div>
    </div>
      )
    }

    {
      currentStep === 2 && (
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
        <h3><MdEdit /> +91{number}</h3>
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
    </>
  );
};

export default Loginform;
