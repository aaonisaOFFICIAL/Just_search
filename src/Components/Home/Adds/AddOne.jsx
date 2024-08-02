import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const images = [
  "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/10/apps.png",
  "https://media.licdn.com/dms/image/D4D12AQFAypnL8ogIzQ/article-cover_image-shrink_600_2000/0/1689750574581?e=2147483647&v=beta&t=HoecVMbnmkVPgY-MedQkPe0wQhrbCX1nOywx2frs0Z0",
  "https://images.squarespace-cdn.com/content/v1/5e7275120157e10f58ad3274/a85f6bc5-0992-44f9-b2b2-1d2d5a17fbd8/Back+To+School+Sale+Round-Up+%282%29.jpg",
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp",
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_webflight_2024.webp",
];
const AddOne = () => {
  return (
    <div>
      <div className="moblie-bottom">
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Carousel autoPlay infiniteLoop>
            {images.map((image, index) => (
              <Box
                key={index}
                component="img"
                className="Carousel_img_box"
                src={image}
                alt={`Slide ${index + 1}`}
              />
            ))}
          </Carousel>
        </Box>
      </div>
    </div>
  );
};

export default AddOne;
