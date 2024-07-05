  import React, { useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { IoLocationOutline, IoChevronDownOutline } from "react-icons/io5";
  import { AuthContext } from '../../Context/AuthContext';
  import { IoMdClose } from 'react-icons/io';
  import { auth } from '../../Config';
  import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
  import './DealsNavbar.css';


  const DealsNavbar = ({ selectedState, onStateChange, city, onCityChange, onCategoryChange, onSubCategoryChange }) => {
    const { currentUser } = useContext(AuthContext)
    const [profileOptions, setProfileOptions] = useState(false);
    const [opneModal, setOpenModal] = useState(false)
    const [mobile, setMobile] = useState('')
    const [user, setUser] = useState(null)
    const [states, setState] = useState([])
    const [selectedStateOption, setSelectedStateOption] = useState('')
    const [district, setDistrict] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('')

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
    //for navigating
    const navigate = useNavigate()

    const navigateToPostAd = () => {
      navigate("/post-ad")
    }

    useEffect(() => {
      const fetchDistricts = async () => {
        try {
          // Fetch state data
          const response = await fetch("https://good-jay-robe.cyclic.app/get-state");
          const result = await response.json();
          const cityArray = result.message;
          setState(cityArray);
    
          if (selectedStateOption) {
            // Fetch district data based on the selected state
            const responseDistrict = await fetch(`https://good-jay-robe.cyclic.app/get-district/${selectedStateOption}`);
            const resultDistrict = await responseDistrict.json();
            const districts = resultDistrict.message.district.split(',').map((district) => district.trim());
            setDistrict(districts);
          }
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchDistricts();
    }, [selectedStateOption]);

    const handleStateChange = (state) => {
      setSelectedStateOption(state);
      onStateChange(state); // Notify parent about the selected state change
    };
  
    const handleCityChange = (selectedCity) => {
      setSelectedDistrict(selectedCity);
      onCityChange(selectedCity); // Notify parent about the selected city change
    };
    
    return (
      <>
        <div className="deals-navbar-main">
          <div className="nav-heading">
            <h1>
              Just <span>Deals</span>
            </h1>
          </div>

          <div className="nav-search">
          {/* <select onChange={(e) => handleStateChange(e.target.value)} value={selectedState}>
            <option value='selected'>Select State</option>
            {states.map((data, index) => (
              <option value={data} key={index}>{data}</option>
            ))}
          </select>

          <select onChange={(e) => handleCityChange(e.target.value)} value={city}>
            <option value="nostate">Select City</option>
            {district.map((city, index) => (
              <option value={city} key={index}>{city}</option>
            ))}
          </select> */}
        </div>

        <p style={{color:"#000",cursor:'pointer'}}onClick={()=>navigate('/')}>  <span style={{color:"#FF6C3D"}}>Home</span> </p>
          <div className="nav-sell__btn">
          
         
            <button onClick={navigateToPostAd}>Sell Something</button>
          </div>

          <div className="nav-sell-avatar" onClick={loginModal}>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
          </div>
        </div>
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
      
        <div className="coming-soon-container">
          
          <div className="coming-soon-content">
            
            <h1 className="coming-soon-title">COMING SOON...</h1>
            <p className="coming-soon-subtitle">STAY TUNED FOR UPDATES!</p>
          </div>
        </div>
      </>
    );
  };

  export default DealsNavbar;
