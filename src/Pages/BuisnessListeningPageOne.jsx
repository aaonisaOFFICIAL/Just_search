import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import BuissnessSvg from "../Components/BuissnessListening/BuissnessSvg";
import BuissnessForm from "../Components/BuissnessListening/BuissnessForm";
import AuthNavbar from "../Components/Home/HomeNavbar";
import MobileFooter from "../Components/MobileFooter/MobileFooter";

const BuisnessListeningPageOne = () => {
  return (
    <>
      <AuthNavbar />
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <div className="listening-page">
          <BuissnessSvg />
          <BuissnessForm />
        </div>
      </Container>
      <div className="home-page-mobilenav">
        <MobileFooter />
      </div>
    </>
  );
};

export default BuisnessListeningPageOne;
