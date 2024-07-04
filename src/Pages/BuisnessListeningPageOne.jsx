import React, { useState } from "react";

import BuissnessSvg from "../Components/BuissnessListening/BuissnessSvg";
import BuissnessForm from "../Components/BuissnessListening/BuissnessForm";
import AuthNavbar from "../Components/Auth/AuthNavbar";


const BuisnessListeningPageOne = () => {
 
  return (
    <>
    <AuthNavbar />
    <div className="listening-page">
        <BuissnessSvg />
        <BuissnessForm />
    </div>
    </>
  );
};

export default BuisnessListeningPageOne;


