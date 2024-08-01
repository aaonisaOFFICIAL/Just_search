import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/02.png"; // Assuming this path is correct

const CategoriesimgAds = () => {
  // Store the actual image imports in the array
  const images = [img1, img1];

  return (
    <div>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Carousel autoPlay infiniteLoop>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{ width: "100%" }}
            />
          ))}
        </Carousel>
      </Box>

      
    </div>
  );
};

export default CategoriesimgAds;
