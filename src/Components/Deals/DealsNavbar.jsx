import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline, IoChevronDownOutline } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthContext";
import { IoMdClose } from "react-icons/io";
import { auth } from "../../Config";
// import MobileFooter from "../Components/MobileFooter/MobileFooter";
import MobileFooter from "../MobileFooter/MobileFooter";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import "./DealsNavbar.css";
import HomeNavbar from "../Home/HomeNavbar";

const DealsNavbar = ({
  selectedState,
  onStateChange,
  city,
  onCityChange,
  onCategoryChange,
  onSubCategoryChange,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [profileOptions, setProfileOptions] = useState(false);
  const [opneModal, setOpenModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [user, setUser] = useState(null);
  const [states, setState] = useState([]);
  const [selectedStateOption, setSelectedStateOption] = useState("");
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

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
  //for navigating
  const navigate = useNavigate();

  const navigateToPostAd = () => {
    navigate("/post-ad");
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        // Fetch state data
        const response = await fetch(
          "https://good-jay-robe.cyclic.app/get-state"
        );
        const result = await response.json();
        const cityArray = result.message;
        setState(cityArray);

        if (selectedStateOption) {
          // Fetch district data based on the selected state
          const responseDistrict = await fetch(
            `https://good-jay-robe.cyclic.app/get-district/${selectedStateOption}`
          );
          const resultDistrict = await responseDistrict.json();
          const districts = resultDistrict.message.district
            .split(",")
            .map((district) => district.trim());
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
      <HomeNavbar />
      {/* {opneModal && (
        <div className="home-modal">
          <div className="home-modal-heading">
            <h1>
              Just <span>Search</span>
            </h1>
          </div>
          <div className="home-modal-body">
            <div>
              <input
                type="text"
                placeholder="Your Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
              />
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
      )} */}
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="offer-navbar-container-">
            <div className="offer-navbar mb-5">
              <h4>Hire</h4>
              <button>Register Youself</button>
            </div>
          </div>
          <div className="offer">
            <div className="container">
              <div className="search-offer offer_search_section_hp">
                <select className="form-select">
                  <option value="selected">State</option>
                </select>

                <select className="form-select mx-2">
                  <option value="nostate">City</option>
                </select>

                <select className="form-select mx-2">
                  <option value="">Designation</option>
                </select>
                <button>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-mobilenav">
        <MobileFooter />
      </div>
    </>
  );
};

export default DealsNavbar;
