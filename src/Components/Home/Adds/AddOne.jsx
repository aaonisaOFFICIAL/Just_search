import React from "react";
import { Box,  } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const images = [
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp",
  "https://www.shutterstock.com/image-vector/promo-banner-bookstore-bookshop-library-260nw-1976145590.jpg",
  "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_cctv_2024.webp",
  // {
  //   imageUrl: 'https://via.placeholder.com/600x400?text=Looking+for+Interior+Designers',
  //   title: 'Looking for ?',
  //   subtitle: 'Interior Designers',
  //   buttonText: 'Get Best Quotes',
  //   buttonLink: '#',
  //   backgroundColor: '#0a043c'
  // },
  // {
  //   imageUrl: 'https://via.placeholder.com/150x400?text=B2B',
  //   title: 'B2B',
  //   subtitle: 'Quick Quotes',
  //   buttonText: '',
  //   buttonLink: '#',
  //   backgroundColor: '#007bff'
  // },
  // {
  //   imageUrl: 'https://via.placeholder.com/150x400?text=REPAIRS+%26+SERVICES',
  //   title: 'REPAIRS & SERVICES',
  //   subtitle: 'Get Nearest Vendor',
  //   buttonText: '',
  //   buttonLink: '#',
  //   backgroundColor: '#1e90ff'
  // },
  // {
  //   imageUrl: 'https://via.placeholder.com/150x400?text=REAL+ESTATE',
  //   title: 'REAL ESTATE',
  //   subtitle: 'Finest Agents',
  //   buttonText: '',
  //   buttonLink: '#',
  //   backgroundColor: '#8a2be2'
  // }
];
const AddOne = () => {
  return (
    <div>
      {/* <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={3} key={index}>
  </Grid>

       <Grid container spacing={2}>
        {images.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                backgroundColor: item.backgroundColor,
                borderRadius: '10px',
                color: '#fff',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                height: '100%'
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ borderRadius: '10px', width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <Typography variant="h4" component="h2" gutterBottom>{item.title}</Typography>
              <Typography variant="h6" component="p" gutterBottom>{item.subtitle}</Typography>
              {item.buttonText && (
                <Button variant="contained" color="primary" href={item.buttonLink}>
                  {item.buttonText}
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid> */}
      <Box sx={{ width:"90%", margin:"auto",marginTop: "40px" }}>
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
