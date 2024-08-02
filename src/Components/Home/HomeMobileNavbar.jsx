import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { IoMdClose, IoMdNotifications } from "react-icons/io";
import { auth } from "../../Config";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../Assests/anslogo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HomeMobileNavbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]); // Array to hold notifications

  const [opneModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [user, setUser] = useState(null);

  const loginModal = () => {
    setOpenModal(!opneModal);
  };
  const closeLoginModal = () => {
    setOpenModal(!opneModal);
  };

  const sendOtp = async () => {
    const mobileNumber = "+91" + mobile;
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        mobileNumber,
        recaptcha
      );
      setUser(confirmation);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      await user.confirm(otp);
      setOpenModal(!opneModal);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        !opneModal;
      })
      .catch((error) => {
        // An error happened.
      });
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
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);
    const notificationsList = querySnapshot.docs.map((doc) => doc.data());
    setNotifications(notificationsList);
  };
  return (
    <div className="home-mobile-navbar">
      <div className="home-mobile-heading">
        {/* <h1>Just <span>Search</span></h1> */}
        <img src={logo} style={{ width: "230px" }} alt="" />
      </div>

      <div className="home-mobile-options">
        <div className="icon-bg" onClick={toggleNotifications}>
          <IoMdNotifications className="mobile-options-notification" />
        </div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          onClick={loginModal}
        />
      </div>
      {opneModal && (
        <div className="modal-overlay">
          <div className="home-modal">
            <div className="home-modal-heading">
              <h1>
                Just <span>Search</span>
              </h1>
            </div>
            <div className="home-modal-body">
              <div>
                <input
                  type="number"
                  placeholder="Your Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
                <div id="recaptcha"></div>
                <button onClick={sendOtp}>Send OTP</button>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOtp}>Verifiy OTP</button>
              </div>
            </div>
            <div className="home-modal-close">
              <IoMdClose onClick={closeLoginModal} />
            </div>
          </div>
        </div>
      )}

      {currentUser && opneModal && (
        <div className="home-modal">
          <div className="home-modal-heading">
            <h1>
              Just <span>Search</span>
            </h1>
          </div>
          <div className="modal-avatar">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="home-modal-close">
            <IoMdClose onClick={closeLoginModal} />
          </div>
        </div>
      )}

{notificationsVisible && (
        <div>
          <div className="overlay" onClick={toggleNotifications}></div>
          <div className="notification-panel home-nav-notification-dropdown">
            <div className="notification-item">
              <div className="avatar">
                <img src="src/Assests/icon.png" alt="User avatar" />
                <span className="status-indicator"></span>
              </div>
              <div className="notification-content">
                <p>
                  <strong>Dominador Manuel</strong> and{" "}
                  <strong>100 other people</strong> reacted to your comment
                  "Tell your partner that...
                </p>
                <span className="time">Aug 20 08:55am</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <img src="src/Assests/icon.png" alt="User avatar" />
                <span className="status-indicator"></span>
              </div>
              <div className="notification-content">
                <p>
                  <strong>Angela Ighot</strong> tagged you and{" "}
                  <strong>9 others</strong> in a post.
                </p>
                <span className="time">Aug 18 10:30am</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <div className="initial">A</div>
              </div>
              <div className="notification-content">
                <p>
                  New listings were added that match your search alert{" "}
                  <strong>house for rent</strong>
                </p>
                <span className="time">Aug 15 08:10pm</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <img src="src/Assests/icon.png" alt="User avatar" />
                <span className="status-indicator"></span>
              </div>
              <div className="notification-content">
                <p>
                  Reminder: <strong>Jerry Cuares</strong> invited you to like{" "}
                  <strong>Cuares Surveying Services</strong>.{" "}
                  <a href="#">Accept</a> or <a href="#">Decline</a>
                </p>
                <span className="time">Aug 14 11:50pm</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <img src="src/Assests/icon.png" alt="User avatar" />
                <span className="status-indicator"></span>
              </div>
              <div className="notification-content">
                <p>
                  <strong>Dyanne Aceron</strong> reacted to your post{" "}
                  <strong>King of the Bed</strong>
                </p>
                <span className="time">Aug 10 05:30am</span>
              </div>
            </div>
            {/* <div className="show-all-notifications">
              <a href="#">Show all Notifications</a>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMobileNavbar;
