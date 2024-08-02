import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/03.png";
import img2 from "../../../Assests/08.png";
import img3 from "../../../Assests/09.png";
import img4 from "../../../Assests/0004.png";
import img5 from "../../../Assests/001.png";

// import img1 from "../../../Assests/03.png";
// import img8 from "../../../Assests/08.png";
// import img9 from "../../../Assests/09.png";

const Newlylisted = () => {
  const images = [img1, img2, img3, img4, img5];
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33);

  useEffect(() => {
    const updateSlidePercentage = () => {
      if (window.innerWidth <= 766) {
        setCenterSlidePercentage(100); // Show 1 image per view on mobile
      } else {
        setCenterSlidePercentage(33); // Show 4 images per view on larger screens
      }
    };

    updateSlidePercentage(); // Set initial value based on current screen size
    window.addEventListener('resize', updateSlidePercentage);

    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);
  return (
    <div>
      <div className="container my-5">
        <h2>Newly listed on Just Search</h2>
        {/* <div className="row mt-4">
      <div className="col-md-4 col-lg-4">
        <div className="card">
        <img src={img1} className="card-img-top" alt="Doctor" />
          <div className="card-body text-center">
            <h5 className="card-title">Mohana Creation’s</h5>
            <div className="d-flex justify-content-center mb-2">
              <span className="category-btn">Dress</span>
              <span className="category-btn">Swimsuits</span>
              <span className="category-btn">Show more</span>
            </div>
            <p className="location"><i className="fas fa-map-marker-alt"></i> Jodhpur, Jodhpur</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-lg-4">
        <div className="card">
        <img src={img8} className="card-img-top" alt="Doctor" />
          <div className="card-body text-center">
            <h5 className="card-title">Mangalore Central Brand</h5>
            <div className="d-flex justify-content-center mb-2">
              <span className="category-btn">Dress</span>
              <span className="category-btn">Womenwear</span>
              <span className="category-btn">Show more</span>
            </div>
            <p className="location"><i className="fas fa-map-marker-alt"></i> Jodhpur, Jodhpur</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-lg-4">
        <div className="card">
        <img src={img9} className="card-img-top" alt="Doctor" />
          <div className="card-body text-center">
            <h5 className="card-title">Poundbusters</h5>
            <div className="d-flex justify-content-center mb-2">
              <span className="category-btn">Pipe</span>
              <span className="category-btn">Sanitary</span>
              <span className="category-btn">Show more</span>
            </div>
            <p className="location"><i className="fas fa-map-marker-alt"></i> Jodhpur, Jodhpur</p>
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
                {/* <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  style={{ height: "300px" }}
                /> */}
                <div className="col-md-12 col-lg-12 me-5">
                  <div className="card mx-2">
                    <img src={src} className="card-img-top" alt="Doctor" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Mohana Creation’s</h5>
                      <div className="d-flex justify-content-center mb-2">
                        <span className="category-btn">Dress</span>
                        <span className="category-btn">Swimsuits</span>
                        <span className="category-btn">Show more</span>
                      </div>
                      <p className="location">
                        <i className="fas fa-map-marker-alt"></i> Jodhpur,
                        Jodhpur
                      </p>
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

export default Newlylisted;
