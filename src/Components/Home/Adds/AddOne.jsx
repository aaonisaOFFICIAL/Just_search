import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const images = [
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp",
  "https://www.shutterstock.com/image-vector/promo-banner-bookstore-bookshop-library-260nw-1976145590.jpg",
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_cctv_2024.webp",
];
const AddOne = () => {
  return (
    <div>
      <Box sx={{ width: "90%", margin: "auto", marginTop: "40px" }}>
        <Carousel autoPlay infiniteLoop>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              sx={{ width: "100%", height: "500px" }}
              src={image}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default AddOne;
