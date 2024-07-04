import React from "react";
import { GoHome } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DealsFooter = () => {
  const navigate = useNavigate()

  const navigateToPages = (pages) => {
    navigate(`/${pages}`)
  }
  return (
    <div className="deals-footer">
      <div onClick={() => navigateToPages("product-screen")}>
        <GoHome className="icon-deals" />
        <p>Home</p>
      </div>
      <div onClick={() => navigateToPages("favourite")}>
        <IoIosHeartEmpty className="icon-deals" />
        <p>Favourite</p>
      </div>
      <div onClick={() => navigateToPages("post-ad")}>
        <div className="sell">
        <FaPlus />
        </div>
        
      </div>
      <div onClick={() => navigateToPages("")}>
        <h2>J<span style={{color:"#FF6C3D", marginLeft:"0px"}}>S</span></h2>
        <p>Just Search</p>
      </div>
      <div>
        <FaRegUser className="icon-deals" />
        <p>Account</p>
      </div>
    </div>
  );
};

export default DealsFooter;
