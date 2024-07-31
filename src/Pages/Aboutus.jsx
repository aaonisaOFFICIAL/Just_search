import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Footer from '../Components/Footer/Footer'
function Aboutus() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">About us</div>
      {/* <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
        <Grid className="Aboutus_content" container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <h4>What is Lorem Ipsum?</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages
            </p>
            <h4>Where can I get some?</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img
              src="src/Assests/Aboutus.jpg"
              className="Aboutus_img"
              alt="User avatar"
            />
          </Grid>

          <Grid className="Our_Team" item xs={12}>
            <h3>Our Team</h3>
            <p>
              We specialize in a wide range of construction services, including
              residential, commercial, and industrial projects.
            </p>
          </Grid>
          <Grid className="Our_Team_member" item xs={12} sm={12} md={6} lg={4} >
            <div className="card-team">
              <img src="src/Assests/team-1.jpg" alt="green iguana" />
              <div className="CardContent">
                <Typography gutterBottom variant="h5" component="div">
                  Benjamin Miller
                </Typography>
                <Typography>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid className="Our_Team_member" item xs={12} sm={12} md={6} lg={4} >
            <div className="card-team">
              <img src="src/Assests/bike.jpg" alt="green iguana" />
              <div className="CardContent">
                <Typography gutterBottom variant="h5" component="div">
                Jane Smith
                </Typography>
                <Typography>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid className="Our_Team_member" item xs={12} sm={12} md={6} lg={4} >
            <div className="card-team">
              <img src="src/Assests/team-1.jpg" alt="green iguana" />
              <div className="CardContent">
                <Typography gutterBottom variant="h5" component="div">
                Mike Johnson
                </Typography>
                <Typography>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container> */}
      <div className="container mt-5">
        <h4>Welcome to Just Search</h4>
        <p>
          Welcome to Just Search, your one-stop destination for finding and
          listing businesses. At Just Search, we aim to bridge the gap between
          customers and businesses, providing a platform where users can
          effortlessly search for services, and business owners can easily list
          and promote their enterprises.
        </p>

        <h4>Our Mission</h4>
        <p>
          Our mission is to create a seamless, user-friendly experience that
          empowers users to find what they need quickly and helps businesses
          reach their target audience effectively. We strive to provide
          accurate, comprehensive, and up-to-date information to make your
          search experience as efficient as possible.
        </p>

        <h4>Our Vision</h4>
        <p>
          We envision a connected community where local businesses thrive, and
          users have instant access to the best services around them. By
          leveraging technology and innovative solutions, we aim to enhance
          local commerce and foster meaningful connections between service
          providers and consumers.
        </p>

        <h4>Why Choose Just Search?</h4>
        <ul>
          <li>
            <b>Extensive Listings:</b> We offer a wide range of categories, from
            restaurants and healthcare to automotive and home services, ensuring
            you find exactly what you're looking for.
          </li>
          <li>
            <b>User-friendly Interface:</b> Our platform is designed to be
            intuitive and easy to navigate, allowing users to search and filter
            results effortlessly.
          </li>
          <li>
            <b>Verified Reviews:</b> We provide genuine, verified reviews from
            real customers to help you make informed decisions.
          </li>
          <li>
            <b>Business Support:</b> We support businesses by providing tools
            for better visibility and customer engagement, including analytics
            and performance tracking.
          </li>
          <li>
            <b>Innovation:</b> We continuously seek to improve our platform with
            the latest technology so you serve better.
          </li>
          <li>
            <b>Community:</b> We are committed to building a supportive and
            inclusive community for all users and businesses.
          </li>
        </ul>

        <p>
          Join us on this journey to discover and connect with the best services
          around you. Whether you're a user searching for a reliable service
          provider or a business looking to expand your reach, Just Search is
          here to help you every step of the way.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Aboutus;
