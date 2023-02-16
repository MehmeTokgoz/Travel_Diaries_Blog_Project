import React from "react";
import { Box } from "@mui/system";
import homeImage from "../assets/homeImage1.jpg";
import "./home.scss";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box className="main-box">
      <img className="homeimage" src={homeImage} alt="#" />
      <Box className="footer-box">
        <Typography>
          Share Your Diaries
        </Typography>
        <Box className="button-box">
          <Button>Share Story</Button>
          <Button className= "diary-button" 
          LinkComponent={Link} to = "/diaries">View Diaries</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
