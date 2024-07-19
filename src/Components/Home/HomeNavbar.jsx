import React, { useContext, useState } from 'react';
import { IoMdNotifications, IoMdClose } from 'react-icons/io';
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import { auth, db } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

const HomeNavbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]); // Array to hold notifications

  const { currentUser } = useContext(AuthContext);

  const loginModal = () => {
    setOpenModal(!openModal);
  };

  const closeLoginModal = () => {
    setOpenModal(false);
  };

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
    // Fetch notifications if they are being shown
    if (!notificationsVisible) {
      fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    // Fetch notifications from Firestore or any other source
    const notificationsRef = collection(db, 'notifications');
    const querySnapshot = await getDocs(notificationsRef);
    const notificationsList = querySnapshot.docs.map(doc => doc.data());
    setNotifications(notificationsList);
  };

  const sendOtp = async () => {
    const mobileNumber = "+91" + mobile;
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", { size: 'invisible' });
      const confirmation = await signInWithPhoneNumber(auth, mobileNumber, recaptcha);
      setUser(confirmation);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      await user.confirm(otp);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const navigateToJS = () => {
    if (!currentUser) {
      loginModal();
    } else {
      navigate("/product-screen");
    }
  };

  const navigateToFav = () => {
    if (!currentUser) {
      loginModal();
    } else {
      navigate("/favourite");
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToListing = async () => {
    if (!currentUser) {
      loginModal();
    } else {
      const phoneNumber = currentUser.phoneNumber;
      const res = phoneNumber.replace("+91", '');

      const favourite = collection(db, 'business-listing');
      const querySnapshot = await getDocs(query(favourite, where('mobilenumber', '==', res)));

      if (querySnapshot.docs.length === 1) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          navigate(`/edit/${doc.id}`);
        });
      } else {
        navigate("/business-listening");
      }
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setOpenModal(false);
    }).catch((error) => {
      console.error(error);
    });
  };

  const navigateToOffer = () => {
    if (!currentUser) {
      loginModal();
    } else {
      navigate("/offer");
    }
  };
  const navigateToPayment = () => {
    if (!currentUser) {
      loginModal();
    } else {
      navigate("/payment");
    }
  };

  return (
    <>
      <div className="home-navbar">
        <div className="home-nav-heading">
          <h1>Just <span>Search</span></h1>
        </div>

        <div className="home-nav-options">
          <p onClick={navigateToHome}>Home</p>
          <p onClick={navigateToFav}>Favorite</p>
          <p style={{ color: "#000" }} onClick={navigateToJS}>
            <span style={{ color: "#FF6C3D" }}>Hire</span>
          </p>
          <p onClick={navigateToOffer}>Offer</p>
          <p onClick={navigateToPayment}>Pricing</p>
          <p onClick={navigateToListing}>Listing</p>
          <button onClick={loginModal}>{currentUser ? currentUser.phoneNumber : "Login / Sign Up"}</button>
          <p onClick={toggleNotifications}><IoMdNotifications className='home-nav-notification' /></p>
        </div>
      </div>
      <div id="recaptcha"></div>

      {openModal && (
        <div className="home-modal">
          <div className="home-modal-heading">
            <h1>Just <span>Search</span></h1>
          </div>
          <div className="home-modal-body">
            <div>
              <input type="text" placeholder='Your Mobile Number' onChange={(e) => setMobile(e.target.value)} maxLength={10} />
              <button onClick={sendOtp}>Send OTP</button>
            </div>
            <div>
              <input type="number" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          </div>
          <div className="home-modal-close">
            <IoMdClose onClick={closeLoginModal} />
          </div>
        </div>
      )}

      {currentUser && openModal && (
        <div className="home-modal">
          <div className="home-modal-heading">
            <h1>Just <span>Search</span></h1>
          </div>
          <div className='modal-avatar'>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="home-modal-close">
            <IoMdClose onClick={closeLoginModal} />
          </div>
        </div>
      )}

      {notificationsVisible && (
        <div className="home-nav-notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <p key={index}>{notification.message}</p>
            ))
          ) : (
            <p>Currently No Notification</p>
          )}
        </div>
      )}
    </>
  );
};

export default HomeNavbar;
