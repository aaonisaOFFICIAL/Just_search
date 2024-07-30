import React, { useContext, useState } from "react";
import { IoMdNotifications, IoMdClose, IoMdPerson } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PolicyIcon from "@mui/icons-material/Policy";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import { MuiOtpInput } from "mui-one-time-password-input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../Config";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";



const items = [
  { text: "User Details", icon: <PersonIcon />, route: "/UserDetails" },
  { text: "Edit Business Profile", icon: <BusinessIcon />, route: "/edit-business-profile" },
  { text: "Get Premium", icon: <StarIcon />, route: "/get-premium" },
  { text: "Help and Support", icon: <HelpIcon />, route: "/help-support" },
  { text: "Feedback", icon: <FeedbackIcon />, route: "/feedback" },
  { text: "Policy", icon: <PolicyIcon />, route: "/policy" },
  { text: "Notifications", icon: <NotificationsIcon />, route: "/notifications" },
  { text: "Favourite", icon: <FavoriteIcon />, route: "/favourite" },
  { text: "Customer Service", icon: <SupportAgentIcon />, route: "/customer-service" },
  { text: "Logout", icon: <LogoutIcon />, route: "/logout" },
];

const HomeNavbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]); // Array to hold notifications

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
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
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);
    const notificationsList = querySnapshot.docs.map((doc) => doc.data());
    setNotifications(notificationsList);
  };




  const sendOtp = async () => {
    if (!mobile) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Mobile number is required",
      });
      return;
    }
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
    if (!otp) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "OTP is required",
      });
      return;
    }
    if (!username) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username is required",
      });
      return;
    }
    try {
      await user.confirm(otp);
      await setDoc(doc(db, "users", user.verificationId), {
        mobile: mobile,
        username: username,
      });
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Wrong OTP",
      });
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
      // loginModal();
      navigate("/business-listening");
    } else {
      const phoneNumber = currentUser.phoneNumber;
      const res = phoneNumber.replace("+91", "");

      const favourite = collection(db, "business-listing");
      const querySnapshot = await getDocs(
        query(favourite, where("mobilenumber", "==", res))
      );

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



  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const username = user.displayName;
      const email = user.email;
      const userId = user.uid;
      const phoneNumber = user.phoneNumber || "";
      console.log(user)

      await setDoc(doc(db, "users", userId), {
        phoneNumber: phoneNumber,
        username: username,
        email: email,
      });
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setOpenModal(false);

      })
      .catch((error) => {
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



  const handleChange = (newValue) => {

    setOtp(newValue);
    if (newValue.length === 6) { // assuming the OTP is 6 digits long
      sendOtp(newValue);
    }
  };
  // profile
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 300, py: 2, px: 0 }} role="presentation">
      <Box sx={{ py: 0, px: 2 }}>
        <CloseIcon className="CloseIcon mb-2" onClose={toggleDrawer(false)} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" className="fw-bold">
            JS-6393
          </Typography>
          <Avatar
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile Image"
          />
        </Box>
      </Box>
      {/* <List>
        {[
          { text: "User Details", icon: <PersonIcon /> },
          { text: "Edit Business Profile", icon: <BusinessIcon /> },
          { text: "Get Premium", icon: <StarIcon /> },
          { text: "Help and Support", icon: <HelpIcon /> },
          { text: "Feedback", icon: <FeedbackIcon /> },
          { text: "Policy", icon: <PolicyIcon /> },
          { text: "Notifications", icon: <NotificationsIcon /> },
          { text: "Favourite", icon: <FavoriteIcon /> },
          { text: "Customer Service", icon: <SupportAgentIcon /> },
          { text: "Logout", icon: <LogoutIcon /> },
        ].map((item) => (
          <React.Fragment key={item.text}>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#ff6c3d1c",
                  color: "#ff6c3d",
                  "& .MuiListItemIcon-root": {
                    color: "#ff6c3d",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List> */}
       <List>
    {items.map((item) => (
      <ListItemButton
        component={Link}
        to={item.route}
        key={item.text}
        sx={{
          "&:hover": {
            backgroundColor: "#ff6c3d1c",
            color: "#ff6c3d",
            "& .MuiListItemIcon-root": {
              color: "#ff6c3d",
            },
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </List>
    </Box>
  );
  // end

  return (
    <>
      <div className="home-navbar">
        <div className="home-nav-heading">
          <h1>
            Just <span>Search</span>
          </h1>
        </div>

        <div className="home-nav-options">
          <a className="active" onClick={navigateToHome}>
            Home
          </a>
          <a onClick={navigateToFav}>Favorite</a>
          <a onClick={navigateToJS}>
            <span>Hire</span>
          </a>
          <a onClick={navigateToOffer}>Offer</a>
          {/* <p onClick={navigateToPayment}>Pricing</p> */}
          <a onClick={navigateToListing}>Listing</a>
          <button onClick={loginModal}>
            {currentUser ? currentUser.phoneNumber : "Login / Sign Up"}
          </button>

          <a className="icon-bg" onClick={toggleNotifications}>
            <IoMdNotifications className="home-nav-notification" />
          </a>

          <a className="icon-bg" onClick={toggleDrawer(true)}>
            <IoMdPerson className="home-nav-notification" />
          </a>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </div>
      <div id="recaptcha"></div>

      {!currentUser && openModal && (
        <div className="modal-overlay">
          <div className="home-modal">
            <div className="home-modal-heading">
              {/* <h1>
                Just <span>Search</span>
              </h1> */}
              <h1>Welcome</h1>
              <h5 className="text-center">Please enter your details</h5>
            </div>
            <div className="home-modal-body">
              <div className="text-center">
                <input
                  type="text"
                  placeholder="Your Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                />
                <button className="mt-2" onClick={sendOtp}>
                  Get OTP
                </button>
              </div>
              <div>


                <MuiOtpInput
                  value={otp}
                  length={6}
                  onChange={(newValue) => {

                    setOtp(newValue);
                    if (newValue.length === 6) { // assuming the OTP is 6 digits long
                      sendOtp(newValue);
                    }
                  }}
                  sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                />
                {/* <input
                  type="number"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                /> */}
                {/* <button onClick={verifyOtp}>Verify OTP</button> */}
                <input className="my-3" type="text" placeholder="Enter Username" />
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <div className="d-flex">
                  <button className="mt-1 w-100 me-2" onClick={verifyOtp}>Submit</button>
                  <button className="mt-1 w-100" onClick={signInWithGoogle}>Sign-Up with Google</button>
                </div>
                <div className="text-center">
                  <button className="mt-2 m-auto">Not Now</button>
                </div>
              </div>
            </div>
            <div className="home-modal-close">
              <IoMdClose onClick={closeLoginModal} />
            </div>
          </div>
        </div>
      )}

      {currentUser && openModal && (
        <div>
          <div className="modal-overlay">
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
    </>
  );
};

export default HomeNavbar;
