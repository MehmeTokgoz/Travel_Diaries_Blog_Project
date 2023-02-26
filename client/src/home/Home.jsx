import React from "react";
import { Box } from "@mui/system";
import homeImage from "../assets/homeImage1.jpg";
import "./home.scss";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate= useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(isLoggedIn)

function shareStory () {
  isLoggedIn ? (
    navigate("/add")
  ):(navigate("/login"))
}

  return (
    <Box className="main-box">
      <img className="homeimage" src={homeImage} alt="#" />
      <Box className="footer-box">
        <Typography>
          Share Your Diaries
        </Typography>
        <Box className="button-box">
          <Button onClick={shareStory}>Share Story</Button>
          <Button className= "diary-button" 
          LinkComponent={Link} to = "/diaries">View Diaries</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
