import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/01.png";

const PopularCategories = () => {
  
  return (
    <div>
     

      <div className="container mb-5">
        <h2>Popular Categories</h2>
        <div className="row justify-content-between mt-4">
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
              <img src={img1} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Mechanic</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img1} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Cook/Chef</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img1} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Pet Shops</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card category-card">
              <img src={img1} className="card-img-top" alt="Doctor" />
              <div className="category-info text-center">
                <h5>Carpenter</h5>
                <button className="btn">See Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;



