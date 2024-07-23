import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import BuissnessSvg from "../Components/BuissnessListening/BuissnessSvg";
import BuissnessForm from "../Components/BuissnessListening/BuissnessForm";
import AuthNavbar from "../Components/Auth/AuthNavbar";

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
    </>
  );
};

export default BuisnessListeningPageOne;
