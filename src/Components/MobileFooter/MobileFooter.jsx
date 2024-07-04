import React, { useContext, useState } from 'react'
import { MdHome } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config';

const MobileFooter = () => {
    const [opneModal, setOpenModal] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const navigateHandler = async(destination) => {
        if(currentUser){
            if(destination==="business-listening"){
                
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
            }else{
                navigate(`/${destination}`)
            }
            // navigate(`/${destination}`)
        }
    }
    const navigateToFav = () => {
        if(currentUser){
            navigate("/favourite")
        }
    } 

    // const loginModal = () => setOpenModal(!opneModal)
    
    // const closeLoginModal = () => setOpenModal(!opneModal)

    //for sending and verifying otp
    // const sendOtp = async() => {
    //     const mobileNumber = "+91" + mobile
    //     try{
    //       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {'size': 'invisible' })
    //       const confirmation = await signInWithPhoneNumber(auth, mobileNumber,recaptcha )
    //       setUser(confirmation)
          
    //     }
    //     catch(err){
    //       console.error(err)
    //     }
    //   }
    
    // const verifyOtp = async() => {
    //     try{
    //        await user.confirm(otp)
    //        setOpenModal(!opneModal)
    //     }
    //     catch(err){
    //         console.error(err)
    //     }
    // } 
  return (
    <div className="mobile-footer">
        <div onClick={() => navigateHandler("")}>
            <MdHome className='icon'/>
            <p>Home</p>
        </div>
        <div onClick={navigateToFav}>
            <FaHeart className='icon'/>
            <p>Favourite</p>
        </div>
        <div onClick={() => navigateHandler("product-screen")}>
            <FaHandshakeSimple className='icon'/>
            <p>Deals</p>
        </div>
        <div onClick={() => navigateHandler("offer")}>
            <BiSolidOffer className='icon'/>
            <p>Offer</p>
        </div>
        <div onClick={() => navigateHandler("business-listening")}>
            <FaShop className='icon'/>
            <p>Listing</p>
        </div>
         
        {/* {opneModal && (
    <div className="home-modal-footer">
        <div className="home-modal-heading">
            <h1>Just <span>Search</span></h1>
        </div>
        <div className="home-modal-body">
            <div>
                <input type="number" placeholder='Your Mobile Number' onChange={(e) => setMobile(e.target.value)}/>
                <button onClick={sendOtp}>Send OTP</button>
            </div>
            <div>
                <input type="number" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)}/>
                <button onClick={verifyOtp}>Verify OTP</button> 
            </div>
        </div>
        <div className="home-modal-close">
            <IoMdClose onClick={closeLoginModal}/>
        </div>
    </div>
)} */}

    </div>
  )
}

export default MobileFooter