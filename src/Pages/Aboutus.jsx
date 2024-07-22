import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

function Aboutus() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">About us</div>
      <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
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
      </Container>
    </div>
  );
}

export default Aboutus;
