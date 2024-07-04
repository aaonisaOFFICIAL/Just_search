import React, { useContext, useState } from 'react'
import { IoMdNotifications } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth, db } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

const HomeNavbar = () => {
    const [opneModal, setOpenModal] = useState(false)
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState("")
    
    //context for checking the auth and getting user's number
    const { currentUser } = useContext(AuthContext)    

    //opening and closing modal
    const loginModal = () => {
        setOpenModal(!opneModal)
    }
    const closeLoginModal = () => {
        setOpenModal(!opneModal)
    }
    const viewNotification = () => {
        setNotification(!notification)
    }
    //for sending and verifying otp
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

    // for navigating the user
    const navigate = useNavigate()
    
    const navigateToJS = () => {
        if(!currentUser){
            loginModal()
        }
        else{
        navigate("/product-screen")
        }
    } 
    const navigateToFav = () => {
        if(!currentUser){
            loginModal()
        }
        else{
            navigate("/favourite")
        }
    } 
    const navigateToHome = () => {
        navigate("/")
    } 
    const navigateToListing = async() => {
        if(!currentUser){
            loginModal()
        }
        else{
            const phoneNumber  = currentUser.phoneNumber;
            const res = phoneNumber.replace("+91",'');

            const favourite = collection(db, 'buissness-listing');
            const querySnapshot = await getDocs(
                query(favourite, where('mobilenumber', '==', res))
            );

            if(querySnapshot.docs.length===1){
                querySnapshot.forEach((doc) => {
                    console.log(doc.id)
                    navigate(`/edit/${doc.id}`)
                });
            }else{
                navigate("/business-listening")
            }
        }
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            (!opneModal)
          }).catch((error) => {
            // An error happened.
          });
    }
    const navigateToOffer = () => {
        if(!currentUser){
            loginModal()
        }
        else{
        navigate("/offer")
        }
    }
  return (
    <>
    <div className="home-navbar">
        <div className="home-nav-heading">
            <h1>Just <span>Search</span></h1>
        </div>

        <div className="home-nav-options">
            <p onClick={navigateToHome}>Home</p>
            <p onClick={navigateToFav}>Favorite</p>
            <p style={{color:"#000"}} onClick={navigateToJS}>J<span style={{color:"#FF6C3D"}}>D</span></p>
            <p onClick={navigateToOffer}>Offer</p>
            <p onClick={navigateToListing}>Listing</p>
            <button onClick={loginModal}>{currentUser ? currentUser.phoneNumber : "Login / Sign Up"}</button>
            <p onClick={viewNotification}><IoMdNotifications className='home-nav-notification' /></p>
        </div>
    </div>
    <div id="recaptcha"></div>

    {opneModal  && (
        <div className="home-modal">
            <div className="home-modal-heading">
                <h1>Just <span>Search</span></h1>
            </div>
               <div className="home-modal-body">
                <div>
                <input type="text" placeholder='Your Mobile Number' onChange={(e) => setMobile(e.target.value)} maxLength={10}/>
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

    {notification &&(
        <div className="home-nav-notification-dropdown">
            <p>Currently No Notification</p>
        </div>
    )}
    </>
  )
}

export default HomeNavbar