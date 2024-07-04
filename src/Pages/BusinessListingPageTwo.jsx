import React, { useState } from "react";

import BuissnessSvg from "../Components/BuissnessListening/BuissnessSvg";
import BuissnessForm from "../Components/BuissnessListening/BuissnessForm";
import AuthNavbar from "../Components/Auth/AuthNavbar";
import BuissnessForm2 from "../Components/BuissnessListening/BusinessListing";


const BuisnessListeningPageTwo = () => {
 
  return (
    <>
    <AuthNavbar />
    <div className="listening-page">
        <BuissnessSvg />
        <BuissnessForm2 />
    </div>
    </>
  );
};

export default BuisnessListeningPageTwo;


