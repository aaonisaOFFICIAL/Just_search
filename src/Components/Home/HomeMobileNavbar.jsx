import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdNotifications } from "react-icons/io";
import { auth } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';

const HomeMobileNavbar = () => {
  const { currentUser } = useContext(AuthContext)

  const [opneModal, setOpenModal] = useState(false)
  const [otp,setOtp] = useState("");
  const [mobile, setMobile] = useState('')
  const [user, setUser] = useState(null)

  const loginModal = () => {
    setOpenModal(!opneModal)
}
const closeLoginModal = () => {
    setOpenModal(!opneModal)
}

const sendOtp = async() => {
  const mobileNumber = "+91" + mobile
  try{
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {'size': 'invisible' })
    const confirmation = await signInWithPhoneNumber(auth, mobileNumber,recaptcha )
    setUser(confirmation)
    
  }
  catch(err){
    console.error(err)
  }
}

const verifyOtp = async() => {
  try{
     await user.confirm(otp)
     setOpenModal(!opneModal)
  }
  catch(err){
      console.error(err)
  }
} 

const handleLogout = () => {
  signOut(auth).then(() => {
      (!opneModal)
    }).catch((error) => {
      // An error happened.
    });
}
  return (
    <div className="home-mobile-navbar">
     <div className="home-mobile-heading">
        <h1>Just <span>Search</span></h1>
     </div>

     <div className="home-mobile-options">
      <div className='icon-bg'>
        <IoMdNotifications  className='mobile-options-notification' />
      </div>
        <img  src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" onClick={loginModal}/>
     </div>
     {opneModal  && (
        <div className="modal-overlay">
        <div className="home-modal">
            <div className="home-modal-heading">
                <h1>Just <span>Search</span></h1>
            </div>
               <div className="home-modal-body">
                <div>
                <input type="number" placeholder='Your Mobile Number' onChange={(e) => setMobile(e.target.value)}/>
                <div id='recaptcha'></div>
                <button onClick={sendOtp}>Send OTP</button>
                </div>
                <div>
                <input type="number" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)}/>
                <button onClick={verifyOtp}>Verifiy OTP</button>
                </div>
               </div>
            <div className="home-modal-close">
                <IoMdClose onClick={closeLoginModal}/>
            </div>
        </div>
        </div>
    )}

{currentUser && opneModal && (
        <div className="home-modal">
        <div className="home-modal-heading">
            <h1>Just <span>Search</span></h1>
        </div>
        <div className='modal-avatar'>
           <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"  />
           <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="home-modal-close">
            <IoMdClose onClick={closeLoginModal}/>
        </div>
    </div>
    )}  
    </div>
  )
}

export default HomeMobileNavbar