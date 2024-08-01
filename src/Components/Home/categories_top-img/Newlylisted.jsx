import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../Assests/03.png";

const Newlylisted = () => {
  
  return (
    <div>
      <div className="container mb-5">
    <h2>Newly listed on Just Search</h2>
    <div className="row mt-4">
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
        <img src={img1} className="card-img-top" alt="Doctor" />
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
        <img src={img1} className="card-img-top" alt="Doctor" />
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
    </div>
  </div>
    </div>
  );
};

export default Newlylisted;



