import React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import homeImage from "../assets/homeImage1.jpg";
import "./home.scss";
import { Button, Tabs, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();

  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUserId(data._id);
        });
    }
  };

  useEffect(() => {
    verifyUser().then(() => {
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [verifyUser]);


  function shareStory () {
    verifyUser().then(
      isLoggedIn ? (
        navigate("/add")
      ):(navigate("/login"))
    )
  }

  return (
    <Box className="main-box">
      <img className="homeimage" src={homeImage} alt="#" />
      <Box className="footer-box">
        <Typography>Share Your Diaries</Typography>
        <Box className="button-box">
          <Button onClick={shareStory}>Share Story</Button>
          <Button className="diary-button" LinkComponent={Link} to="/diaries">
            View Diaries
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
