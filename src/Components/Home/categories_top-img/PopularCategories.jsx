import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/001.png";
import img2 from "../../../Assests/002.png";
import img3 from "../../../Assests/003.png";
import img4 from "../../../Assests/004.png";
import img5 from "../../../Assests/005.png";

const PopularCategories = () => {
  const images = [img1, img2, img3, img4, img5];
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33);

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
      <div className="container mb-5 Popular_Categories">
        <h2>Popular Categories</h2>
        {/* <div className="row justify-content-between mt-4">
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img1} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Doctor</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img2} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Mechanic</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img3} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Cook/Chef</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img4} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Pet Shops</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img5} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Carpenter</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
        </div> */}
        <Box>
          <Carousel
            className="Carousel_img_translate3d"
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            autoPlay
            interval={3000}
            centerMode
            centerSlidePercentage={centerSlidePercentage} // Show 4 images at a time (100/4=25)
            swipeable
          >
            {images.map((src, index) => (
              <div className="row mt-4" key={index}>
                <div className="col-lg-12">
                  <div className="card category-card mx-2">
                    <img src={src} className="card-img-top" alt="Doctor" />
                    <div className="category-info text-center">
                      <h5>Doctor</h5>
                      <button className="btn">See Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </Box>
      </div>
    </div>
  );
};

export default PopularCategories;
