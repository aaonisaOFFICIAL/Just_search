import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/0001.png";
import img2 from "../../../Assests/0002.png";
import img3 from "../../../Assests/0003.png";
import img4 from "../../../Assests/0004.png";
import img5 from "../../../Assests/001.png";

const CategoriesimgAds = () => {
  // Store the actual image imports in the array
  const images = [img1, img2, img3, img4, img5];
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(25);

  useEffect(() => {
    const updateSlidePercentage = () => {
      if (window.innerWidth <= 766) {
        setCenterSlidePercentage(100); // Show 1 image per view on mobile
      } else {
        setCenterSlidePercentage(25); // Show 4 images per view on larger screens
      }
    };

    updateSlidePercentage(); // Set initial value based on current screen size
    window.addEventListener('resize', updateSlidePercentage);

    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);
  return (
    <div>
      <Box>
        <Carousel
          className="Carousel_img_translate3d"
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay
          // interval={3000}
          centerMode
         centerSlidePercentage={centerSlidePercentage} // Show 4 images at a time (100/4=25)
          swipeable
        >
          {images.map((src, index) => (
            <div key={index}>
              <img className='Carousel_img_one'
                src={src}
                alt={`Image ${index + 1}`}
                style={{ height: "300px" }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default CategoriesimgAds;
